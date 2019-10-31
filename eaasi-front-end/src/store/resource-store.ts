import EaasiTask from '@/models/task/EaasiTask';
import { make } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';
import { populateFacets } from '@/helpers/ResourceSearchFacetHelper';

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
		if(!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
    	if (result) dispatch('populateSearchFacets');
		return result;
	},

	/**
	 * Triggers request to save an Environment to local storage
	 * @param _store Store<ResourceState>
	 * @param environment: instance that satisfies IEnvironment
	 */
	async saveEnvironment({ state, commit }: Store<ResourceState>, environment: IEnvironment) : Promise<EaasiTask> {
		let taskState = await _svc.saveEnvironment(environment.envId);
		if (!taskState) return null;
		let environmentTitle = environment.title;

		let task = new EaasiTask(taskState.taskList[0], `Save Environment: ${environmentTitle}`);

		commit('ADD_OR_UPDATE_TASK', task, { root: true });
		commit('SET_SAVING_ENVIRONMENTS', [...state.savingEnvironments, environment.envId]);

		let taskMap = state.saveEnvironmentTaskMap;
		taskMap[environment.envId] = task;
		commit('SET_SAVE_ENVIRONMENT_TASK_MAP', taskMap);

		return task;
	},

	async clearSearch({ commit, dispatch }) {
		const clearSearchQuery: IResourceSearchQuery = new ResourceSearchQuery();
		let result = await _svc.searchResources(clearSearchQuery);
		if(!result) return;
		commit('SET_RESULT', result);
		// generates facets based on the result received in searchResources.
    	// eventually won't need to do this, because facets will come with a result from the backend
    	if (result) dispatch('populateSearchFacets');
		return result;
	},

	// this will map results and generate facets
	populateSearchFacets({ state, commit }: Store<ResourceState>) {
		const { environments, software, content } = state.result;
		const facets = populateFacets(environments, software, content);
		commit('SET_QUERY', {...state.query, selectedFacets: facets});
	}
};

/*============================================================
 == Getters
/============================================================*/

const getters = {
	isSingleResult(state) {
		if(!state.result) return false;
		const { environments, software, content } = state.result;
		console.log(environments, software, content);
		const lengthArr: number[] = [];
		environments && lengthArr.push(environments.result.length);
		software && lengthArr.push(software.result.length);
		content && lengthArr.push(content.result.length);
		return lengthArr.filter(length => length > 0).length === 1;
	}
};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
