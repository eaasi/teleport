import { IEnvironmentUpdateRequest, IReplicateEnvironmentRequest, ISaveEnvironmentResponse, mapEnvironmentToEnvironmentUpdateRequest } from '@/helpers/ResourceHelper';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import _svc from '@/services/ResourceService';
import { IBookmark } from '@/types/Bookmark';
import {ICreateEnvironmentPayload, IImageDeletePayload, IPatch, ISoftwareDeletePayload, ITemplate} from '@/types/Import';
import { IEaasiResource, IEnvironment, ISavingEnvironmentState, ResourceType } from '@/types/Resource';
import { IResourceSearchFacet, IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { archiveTypes, resourceTypes } from '@/utils/constants';
import { jsonCopy, removeDuplicatesFromFlatArray } from '@/utils/functions';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';
import {IEaasiTab} from 'eaasi-nav';

/*============================================================
 == State
/============================================================*/

class ResourceState {
	activeEnvironment: IEnvironment = null;
	activeEphemeralEnvironment: ICreateEnvironmentPayload = null;
	selectedResources: IEaasiResource[] = [];
	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IResourceSearchResponse = null;
	savingEnvironments: ISavingEnvironmentState[] = [];
	availableTemplates: ITemplate[] = [];
	availablePatches: IPatch[] = [];
	clientComponentId: string = '';
	imports: IEaasiResource[] = [];
	resourceName: string = '';
	lastSearchKeyword: string = '';
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

mutations['RESET_ACTIVE_ENVIRONMENT_CONFIG'] = function(state: ResourceState) {
	state.activeEnvironment = null;
	state.activeEphemeralEnvironment = null;
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getEnvironment(_store: Store<ResourceState>, environmentId: string) {
		return await _svc.getEnvironment(environmentId);
	},

	async searchResources({ state, commit, rootState }, options?: { forceClearCache : boolean }): Promise<IResourceSearchResponse> {
		commit('SET_LAST_SEARCH_KEYWORD', state.query.keyword);
		const result = await _svc.searchResources({...state.query, forceClearCache: !!options?.forceClearCache}, rootState.loggedInUser.id);
		if (!result) return null;
		commit('SET_RESULT', result);
		const selectedFacets = jsonCopy(result.facets);
		commit('SET_QUERY', {...state.query, selectedFacets });
		return result;
	},

	/**
	 * Triggers request to save an Environment to local storage
	 * @param _store Store<ResourceState>
	 * @param environment: IEnvironment
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
		const resources = state.selectedResources;
		if (!resources || !resources.length) {
			console.warn('No resources to delete');
			return;
		}

		return await Promise.all(resources.map(resource => {
			let id: string | number;
			if (resource.envId) {
				id = resource.envId;
			} else if (resource.id) {
				id = resource.id;
			}

			if (!id) return;
			return _svc.deleteEnvironment(id.toString());
		}));
	},

	async deleteEnvironment(_, envId: string): Promise<void> {
		await _svc.deleteEnvironment(envId);
	},

	async onEnvironmentSaved({ state, commit }: Store<ResourceState>, environmentId: string) {
		const newSavingEnvs = state.savingEnvironments.filter(saveState => saveState.envId != environmentId);
		commit('SET_SAVING_ENVIRONMENTS', newSavingEnvs);
	},

	async deleteImages(_, payloads: IImageDeletePayload[]) {
		return await Promise.all(payloads.map(payload =>
			_svc.deleteImage(payload)
		));
	},

	async deleteSoftwareResources(_, payloads: ISoftwareDeletePayload[]) {
		await Promise.all(payloads.map(payload =>
			_svc.deleteSoftware(payload.id)
		));
	},

	async deleteImage(_, payload: IImageDeletePayload) {
		return await _svc.deleteImage(payload);
	},

	async clearSearch({ commit, dispatch, rootState }) {
		const clearSearchQuery: IResourceSearchQuery = new ResourceSearchQuery();
		commit('SET_QUERY', clearSearchQuery);
		dispatch('searchResources');
		const result = await _svc.searchResources(clearSearchQuery, rootState.loggedInUser.id);
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
		const result = await _svc.getTemplates();
		commit('SET_AVAILABLE_TEMPLATES', result);
	},

	async getPatches({ commit }) {
		const result = await _svc.getPatches();
		commit('SET_AVAILABLE_PATCHES', result);
	},

	async getEmulators(_) {
		return await _svc.getEmulators();
	},

	async getOperatingSystemMetadata(_) {
		return await _svc.operatingSystemMetadata();
	},

	async forkRevision(_, revisionId: string) {
		return await _svc.forkRevision(revisionId);
	},

	async getImports({ commit, state, rootState }) {
		const importQuery: IResourceSearchQuery = {
			keyword: null,
			selectedFacets: state.query.selectedFacets,
			limit: state.query.limit,
			page: state.query.page,
			types: [],
			archives: ['zero conf', 'default']  // TODO: What is zero conf?
		};

		const result = await _svc.searchResources(importQuery, rootState.loggedInUser.id);
		if (!result) return;

		commit('SET_QUERY', {...state.query, selectedFacets: result.facets});
		commit('SET_RESULT', result);
	},

	async saveEnvironmentRevision({ state }: Store<ResourceState>, description) {
		return await _svc.saveEnvironmentRevision(
			state.activeEnvironment.envId,
			state.clientComponentId,
			description,
			state.activeEnvironment
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

	async getResourceOwner(_, ownerId: string) {
		return await _svc.getResourceOwner(ownerId);
	},

	async syncImagesUrl() {
		return await _svc.syncImagesUrl();
	},

	async syncObjectsUrl() {
		return await _svc.syncObjectsUrl();
	},

	async syncSoftwareUrl() {
		return await _svc.syncSoftwareUrl();
	},
};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	isSingleResult(state: ResourceState) {
		if (!state.result) return false;
		const { environments, software, content } = state.result;
		const lengthArr: number[] = [];
		environments && lengthArr.push(environments.result.length);
		software && lengthArr.push(software.result.length);
		content && lengthArr.push(content.result.length);
		return lengthArr.filter(length => length > 0).length === 1;
	},

	bookmarks(state: ResourceState): IBookmark[] {
		return state.result && state.result.bookmarks ? state.result.bookmarks : [];
	},

	environmentIsSelected(state: ResourceState): boolean {
		return state.selectedResources.some(res => res.resourceType === resourceTypes.ENVIRONMENT);
	},

	imageIsSelected(state: ResourceState): boolean {
		return state.selectedResources.some(res => res.resourceType === resourceTypes.IMAGE);
	},

	softwareIsSelected(state: ResourceState): boolean {
		return state.selectedResources.some(res => res.resourceType === resourceTypes.SOFTWARE);
	},

	scontentIsSelected(state: ResourceState): boolean {
		return state.selectedResources.some(res => res.resourceType === resourceTypes.CONTENT);
	},

	onlySelectedResource(state: ResourceState) : IEaasiResource {
		if(state.selectedResources.length !== 1) return null;
		return state.selectedResources[0];
	},

	facetsOfResourceTypesSelected(_, getters): ResourceType[] {
		if (!getters.onlySelectedFacets) {
			return null;
		}
		const resourceTypes = getters.onlySelectedFacets.flatMap(
			f => f.values.map(v => v.resourceType)
		);
		return removeDuplicatesFromFlatArray<ResourceType>(resourceTypes);
	},

	facetsOfSingleTypeSelected(_, getters): boolean {
		return getters.facetsOfResourceTypesSelected.length === 1;
	},

	onlySelectedFacets(state: ResourceState): IResourceSearchFacet[] {
		return state.query.selectedFacets
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
	},

	slideMenuTabs(state: ResourceState): IEaasiTab[] {
		return [
			{ label: 'Actions' },
		];
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
