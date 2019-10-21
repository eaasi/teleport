import EaasiTask from '@/models/task/EaasiTask';
import { make } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IResourceSearchQuery, IResourceSearchResponse, IResourceSearchFacet, IResourceSearchFacetValue } from '@/types/Search';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import {IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';

/*============================================================
 == State
/============================================================*/

class ResourceState {
	activeEnvironment: IEnvironment = null;

	/**
	 * Active Resources are Selected in Explore Resources / My Resources Screen
	 */
	activeResources: IEaasiResource[] = [];

	taskListStatus: IEaasiTaskListStatus = {status: '', taskList: []};

	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IResourceSearchResponse = null;
	facets: IResourceSearchFacet[] = []; // TODO: These should come from ResourceSearchResponse
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

	async searchResources({ state, commit }: Store<ResourceState>) {
		let result = await _svc.searchResources(state.query);
		if(!result) return;
		commit('SET_RESULT', {...result, facets: state.facets}); // TODO: facets should be in the result. Populate with dummy data for now
		return result;
	},

	/**
	 * Triggers request to save an Environment to local storage
	 * @param _store Store<ResourceState>
	 * @param environment: instance that satisfies IEnvironment
	 */
	async saveEnvironment(_store: Store<ResourceState>, environment: IEnvironment): Promise<EaasiTask> {
		let taskState = await _svc.saveEnvironment(environment.envId);
		let environmentTitle = environment.title;
		if (!taskState) return null;
		let task = new EaasiTask(taskState.taskList[0], `Save Environment ${environmentTitle}`); // TODO: handle multiple tasks, wrap string
		_store.commit('ADD_OR_UPDATE_TASK', task, { root: true });
		return task;
	},

	populateSearchFacets({ state, commit }: Store<ResourceState>) {
		// {
		// 	name: 'Network Status',
		// 	type: 'Software',
		// 	values: [
		// 		{
		// 			label: 'Private',
		// 			total: 4,
		// 			isSelected: false
		// 		}
		// 	]
		// }
		const facets: IResourceSearchFacet[] = [
			{ name: 'archive', values: [] },
			{ name: 'envType', values: [] },
			{ name: 'owner', values: [] },
			{ name: 'archiveID', values: [] }
		]
		state.result.environments.result.forEach(e => {
			facets.forEach(f => {
				if (e[f.name] != null) {
					const value = f.values.find(v => v.label === e[f.name]);
					console.log(value)
					const total = value ? value.total : 1;
					f.values.push({ label: e[f.name], total, isSelected: false });
				}
			});
		})
		state.result.software.result.forEach(e => {
			facets.forEach(f => {
				if (e[f.name] != null) {
					const value = f.values.find(v => v.label === e[f.name]);
					console.log(value)
					const total = value ? value.total : 1;
					f.values.push({ label: e[f.name], total, isSelected: false });
				}
			});
		})
		console.log(facets)
		commit('SET_QUERY', {...state.query, selectedFacets: facets});
	}
};

/*============================================================
 == Getters
/============================================================*/

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
