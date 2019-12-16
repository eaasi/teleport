import { IEnvironmentUpdateRequest, IReplicateImageRequest, mapEnvironmentToEnvironmentUpdateRequest } from '@/helpers/ResourceHelper';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import EaasiTask from '@/models/task/EaasiTask';
import _svc from '@/services/ResourceService';
import { IBookmark } from '@/types/Bookmark';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { IEaasiResource, IEnvironment, ResourceType } from '@/types/Resource';
import { IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { resourceTypes } from '@/utils/constants';
import { removeDuplicatesFromFlatArray } from '@/utils/functions';
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

mutations['SET_SELECTED_FACET_RESOURCE_TYPE'] = function(state: ResourceState, resources: ResourceType[]) {
	const selectedFacets = state.query.selectedFacets.map(sf => {
		if (sf.name !== 'resourceType') return sf;
		const values = sf.values.map(
			v => resources.some(r => r === v.label) ? {...v, isSelected: true} : v
		);
		return {...sf, values };
	});
	state.query = {...state.query, selectedFacets};
};

mutations['UNSELECT_ALL_FACETS'] = function(state: ResourceState) {
	state.query.selectedFacets.forEach(facet => {
		facet.values.forEach(value => value.isSelected = false);
	});
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getEnvironment(_store: Store<ResourceState>, environmentId: string) {
		return await _svc.getEnvironment(environmentId);
	},

	async searchResources({ state, commit }: Store<ResourceState>) {
		let result = await _svc.searchResources(state.query);
		if (!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
		// eventually won't need to do this, because facets will come with a result from the backend
		commit('SET_QUERY', {...state.query, selectedFacets: result.facets});
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

	async clearSearch({ commit }) {
		const clearSearchQuery: IResourceSearchQuery = new ResourceSearchQuery();
		let result = await _svc.searchResources(clearSearchQuery);
		if (!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
		return result;
	},

	async updateEnvironmentDetails(_, environment) {
		const envRequest: IEnvironmentUpdateRequest = mapEnvironmentToEnvironmentUpdateRequest(environment);
		return await _svc.updateEnvironmentDetails(envRequest);
	},

	clearSearchQuery({ commit }: Store<ResourceState>) {
		commit('SET_QUERY', new ResourceSearchQuery());
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

	async getImports({ commit, state }) {
		const importQuery: IResourceSearchQuery = {
			keyword: null,
			selectedFacets: state.query.selectedFacets,
			limit: state.query.limit,
			page: state.query.page,
			types: [],
			archives: ['zero conf', 'default']  // TODO: What is zero conf?
		};

		const result = await _svc.searchResources(importQuery);
		if (!result) return;
		
		commit('SET_QUERY', {...state.query, selectedFacets: result.facets});
		commit('SET_RESULT', result);
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

	bookmarks(state): IBookmark[] {
		return state.result && state.result.bookmarks ? state.result.bookmarks : [];
	},

	environmentIsSelected(state): Boolean {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.ENVIRONMENT).length;
	},

	softwareIsSelected(state): Boolean {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.SOFTWARE).length;
	},

	onlySelectedResource(state) : IEaasiResource {
		if (state.selectedResources.length === 1) return state.selectedResources[0];
		else null;
	},

	facetsOfResourceTypesSelected(_, getters): ResourceType[] {
		const resourceTypes = getters.onlySelectedFacets.flatMap(
			f => f.values.map(v => v.resourceType)
		);
		return removeDuplicatesFromFlatArray<ResourceType>(resourceTypes);
	},

	facetsOfSingleTypeSelected(_, getters): Boolean {
		return getters.facetsOfResourceTypesSelected.length === 1;
	},

	onlySelectedFacets(state): IResourceSearchFacet[] {
		const selectedFacets = state.query.selectedFacets
			.flatMap(f => {
				if(f.values.some(v => v.isSelected)) {
					const values = f.values
						.map(v => v.isSelected ? v : null)
						.filter(i => i !== null);
					return {...f, values };
				} else {
					return null;
				}
			})
			.filter(i => i !== null);
		return selectedFacets;
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
