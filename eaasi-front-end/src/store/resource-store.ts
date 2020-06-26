import { IEnvironmentUpdateRequest, IReplicateEnvironmentRequest, ISaveEnvironmentResponse, mapEnvironmentToEnvironmentUpdateRequest } from '@/helpers/ResourceHelper';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import _svc from '@/services/ResourceService';
import { IBookmark } from '@/types/Bookmark';
import { IEmulatorComponentRequest, ITempEnvironmentRecord } from '@/types/Emulation';
import { IPatch, ITemplate } from '@/types/Import';
import { IEaasiResource, IEnvironment, ISavingEnvironmentState, ResourceType } from '@/types/Resource';
import { IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { jsonCopy, removeDuplicatesFromFlatArray } from '@/utils/functions';
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
	savingEnvironments: ISavingEnvironmentState[] = [];
	availableTemplates: ITemplate[] = [];
	availablePatches: IPatch[] = [];
	clientComponentId: string = '';
	imports: IEaasiResource[] = [];
	resourceName: string = '';
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
		const selectedFacets = jsonCopy(result.facets);
		commit('SET_QUERY', {...state.query, selectedFacets });
		return result;
	},

	/**
	 * Triggers request to save an Environment to local storage
	 * @param _store Store<ResourceState>
	 */
	async replicateEnvironment({ state, commit }: Store<ResourceState>, environment: IEnvironment): Promise<ISaveEnvironmentResponse> {
		const req: IReplicateEnvironmentRequest = {
			destArchive: archiveTypes.PUBLIC,
			replicateList: [environment.envId]
		};
		const res = await _svc.replicateEnvironment(req);
		const saveState : ISavingEnvironmentState = {
			taskId: res.taskList[0],
			envId: environment.envId
		};
		const updatedSavingEnvs: ISavingEnvironmentState[] = [...state.savingEnvironments, saveState ];
		commit('SET_SAVING_ENVIRONMENTS', updatedSavingEnvs);
		return res;
	},

	async deleteSelectedResource({ state }: Store<ResourceState>) {
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
		const newSavingEnvs = state.savingEnvironments.filter(saveState => saveState.envId != environmentId);
		commit('SET_SAVING_ENVIRONMENTS', newSavingEnvs);
	},

	async clearSearch({ commit, dispatch }) {
		const clearSearchQuery: IResourceSearchQuery = new ResourceSearchQuery();
		commit('SET_QUERY', clearSearchQuery);
		dispatch('searchResources');
		let result = await _svc.searchResources(clearSearchQuery);
		if (!result) return;
		commit('SET_RESULT', result);
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

	async getPatches({ commit }) {
		let result = await _svc.getPatches();
		commit('SET_AVAILABLE_PATCHES', result);
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
	},

	async saveEnvironmentRevision({ state }, description) {
		return await _svc.saveEnvironmentRevision(
			state.activeEnvironment.envId,
			state.clientComponentId,
			description
		);
	},

	async saveNewEnvironment({ state }, { title, description }) {
		return await _svc.saveNewEnvironment(
			state.activeEnvironment.envId,
			state.clientComponentId,
			title,
			description
		);
	},

	async saveObjectEnvironment({ state }, { title, description }) {
		return await _svc.saveNewObjectEnvironment(
			state.activeEnvironment.envId,
			state.clientComponentId,
			state.activeEnvironment.object,
			title,
			description
		);
	},

	publishEnvironmentsToNetwork(_store, envIds: string[]) {
		return _svc.publishEnvironmentsToNetwork(envIds);
	},

	async addEnvironmentToTempArchive(_, payload: IEmulatorComponentRequest) {
		return await _svc.addEnvironmentToTempArchive(payload);
	},

	async deleteEnvironmentFromTempArchive(_, envId: string) {
		return await _svc.deleteEnvironmentFromTempArchive(envId);
	},

	async getAllTemp(_): Promise<ITempEnvironmentRecord[]> {
		return await _svc.getAllTemp();
	},

	async cleanTempEnvironment({ commit, dispatch, state }: Store<ResourceState>) {
		let tempRecords: ITempEnvironmentRecord[] = await dispatch('getAllTemp');
		if (tempRecords.some(tmp => tmp.envId === state.activeEnvironment.envId)) {
			await dispatch('deleteEnvironmentFromTempArchive', state.activeEnvironment.envId);
			commit('SET_ACTIVE_ENVIRONMENT', null);
		}
		return null;
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

	environmentIsSelected(state): boolean {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.ENVIRONMENT).length;
	},

	softwareIsSelected(state): boolean {
		return state.selectedResources
				.filter(res => res.resourceType === resourceTypes.SOFTWARE).length;
	},

	onlySelectedResource(state) : IEaasiResource {
		if(state.selectedResources.length !== 1) return null;
		return state.selectedResources[0];
	},

	facetsOfResourceTypesSelected(_, getters): ResourceType[] {
		const resourceTypes = getters.onlySelectedFacets.flatMap(
			f => f.values.map(v => v.resourceType)
		);
		return removeDuplicatesFromFlatArray<ResourceType>(resourceTypes);
	},

	facetsOfSingleTypeSelected(_, getters): boolean {
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
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
