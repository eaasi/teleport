import EaasiTask from '@/models/task/EaasiTask';
import { make } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IResourceSearchQuery, IResourceSearchResponse, IResourceSearchFacet, IResourceSearchFacetValue, IEaasiSearchResponse } from '@/types/Search';
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
		commit('SET_RESULT', result);
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

	// this will map results and generate facets
	populateSearchFacets({ state, commit }: Store<ResourceState>) {
		const facets: IResourceSearchFacet[] = [
			{ name: 'archive', values: [] },
			{ name: 'envType', values: [] },
			{ name: 'owner', values: [] },
			{ name: 'archiveId', values: [] }
		];
		facets.forEach(f => {
			if (state.result.environments) {
				state.result.environments.result.forEach(e => {
					if (e[f.name] != null) {
						const value = f.values.find(v => v.label === e[f.name]);
						if(value) {
							f.values.forEach(v => v.label === value.label ? v.total += 1 : null);
						} else {
							f.values.push({ label: e[f.name], total: 1, isSelected: false });
						}
					}
				});
			}
			if (state.result.software) {
				state.result.software.result.forEach(e => {
					if (e[f.name] != null) {
						const value = f.values.find(v => v.label === e[f.name]);
						if(value) {
							f.values.forEach(v => v.label === value.label ? v.total += 1 : null);
						} else {
							f.values.push({ label: e[f.name], total: 1, isSelected: false });
						}
					}
				});
			}
		});
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
