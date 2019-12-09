import { IEnvironmentUpdateRequest, IReplicateImageRequest, mapEnvironmentToEnvironmentUpdateRequest } from '@/helpers/ResourceHelper';
import { populateFacets } from '@/helpers/ResourceSearchFacetHelper';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import EaasiTask from '@/models/task/EaasiTask';
import _svc from '@/services/ResourceService';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { resourceTypes } from '@/utils/constants';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/
class ResourceState {
	activeEnvironment: IEnvironment = null;
	selectedResources: IEaasiResource[] = [];
	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IResourceSearchResponse = null;
	savingEnvironments: string[] = [];
	saveEnvironmentTaskMap: object = {};
	availableTemplates: any[] = [];
	clientComponentId: string = '';
	imports: IEaasiResource[] = [];
}

const state = new ResourceState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getEnvironment(_store: Store<ResourceState>, environmentId: string) {
		return await _svc.getEnvironment(environmentId);
	},

	async searchResources({ state, commit, dispatch }: Store<ResourceState>) {
		let result = await _svc.searchResources(state.query);
		if (!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
    	if (result) dispatch('populateSearchFacets');
		return result;
	},

	/**
	 * Triggers request to save an Environment to local storage
	 * @param _store Store<ResourceState>
	 */
	async saveEnvironment({ state, dispatch }: Store<ResourceState>): Promise<EaasiTask> {
		const environment = state.selectedResources[0];
		if (!environment) return;

		let result = await _svc.saveEnvironment(environment.envId);
		if (!result) return null;
		dispatch('generateTask', { result, environment });
	},

	async replicateImage({ dispatch }: Store<ResourceState>, environment: IEnvironment): Promise<IEaasiTaskListStatus> {
		const req: IReplicateImageRequest = {
			destArchive: 'public',
			replicateList: [environment.envId]
		};
		const result: IEaasiTaskListStatus = await _svc.replicateImage(req);
		if (!result) return null;
		dispatch('generateTask', { result, environment });
		return result;
	},

	generateTask({ state, commit }: Store<ResourceState>, { result, environment }) {
		const { title, envId } = environment;
		let task = new EaasiTask(result.taskList[0], `Save Environment: ${title}`);
		commit('ADD_OR_UPDATE_TASK', task, { root: true });
		commit('SET_SAVING_ENVIRONMENTS', [...state.savingEnvironments, envId]);

		let taskMap = state.saveEnvironmentTaskMap;
		taskMap[envId] = task;
		commit('SET_SAVE_ENVIRONMENT_TASK_MAP', taskMap);

		return task;
	},

	async deleteSelectedResource({ state }: Store<ResourceState>) {
		// TODO: Deleting an environment is currently not working on the back end.
		// Issue is being tracked: https://gitlab.com/eaasi/eaasi-client-dev/issues/283
		const resource = state.selectedResources[0];
		if (!resource) return;

		let id: string | number;
		if (resource.envId) {
			id = resource.envId;
		} else if (resource.id) {
			id = resource.id;
		}
		if (!id) return;

		return await _svc.deleteEnvironment(resource.envId);
	},

	async onEnvironmentSaved({ state, commit }: Store<ResourceState>, environmentId: string) {
		const newSavingEnvs = state.savingEnvironments.filter(x => x != environmentId);
		commit('SET_SAVING_ENVIRONMENTS', newSavingEnvs);
	},

	async clearSearch({ commit, dispatch }) {
		const clearSearchQuery: IResourceSearchQuery = new ResourceSearchQuery();
		let result = await _svc.searchResources(clearSearchQuery);
		if (!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
    	if (result) dispatch('populateSearchFacets');
		return result;
	},

	async updateEnvironmentDetails(_, environment) {
		const envRequest: IEnvironmentUpdateRequest = mapEnvironmentToEnvironmentUpdateRequest(environment);
		return await _svc.updateEnvironmentDetails(envRequest);
	},

	clearSearchQuery({ commit }: Store<ResourceState>) {
		commit('SET_QUERY', new ResourceSearchQuery());
	},

	// this will map results and generate facets
	populateSearchFacets({ state, commit }: Store<ResourceState>) {
		const { environments, software, content } = state.result;
		const facets = populateFacets(environments, software, content);
		commit('SET_QUERY', {...state.query, selectedFacets: facets});
	},

	async getTemplates({ commit }) {
		let result = await _svc.getTemplates();
		commit('SET_AVAILABLE_TEMPLATES', result);
	},

	async getNameIndexes(_) {
		return await _svc.getNameIndexes();
	},

	async getOperatingSystemMetadata(_) {
		return await _svc.operatingSystemMetadata();
	},

	async forkRevision(_, revisionId: string) {
		return await _svc.forkRevision(revisionId);
	},

	async getImports({ commit, dispatch }) {
		const importQuery: IResourceSearchQuery = {
			keyword: '',
			selectedFacets: [],
			limit: 5000,
			types: [resourceTypes.SOFTWARE, resourceTypes.ENVIRONMENT, resourceTypes.CONTENT],
			archives: ['default'] // Imports are stored in 'default' -- // Todo: more specific distinction?
		};

		const result = await _svc.searchResources(importQuery);
		if (!result) return;

		let envs = result.environments.result;
		let software = result.software.result;
		let content = result.content.result;

		const imports = [...envs, ...software, ...content];
		commit('SET_IMPORTS', imports);

		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
		// eventually won't need to do this, because facets will come with a result from the backend
		if (result) dispatch('populateSearchFacets');
	}
};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	isSingleResult(state) {
		if (!state.result) return false;
		const { environments, software, content } = state.result;
		const lengthArr: number[] = [];
		environments && lengthArr.push(environments.result.length);
		software && lengthArr.push(software.result.length);
		content && lengthArr.push(content.result.length);
		return lengthArr.filter(length => length > 0).length === 1;
	},

	environmentIsSelected(state) {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.ENVIRONMENT).length;
	},

	softwareIsSelected(state) {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.SOFTWARE).length;
	},
	
	onlySelectedResource(state) : IEaasiResource {
		if (state.selectedResources.length === 1) return  state.selectedResources[0];
	},

};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
