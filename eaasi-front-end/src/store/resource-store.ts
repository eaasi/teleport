import { make, commit } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
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

	async getEnvironment(_store: Store<ResourceState>, envId: string) {
		return await _svc.getEnvironment(envId);
	},

	async searchResources({ state, commit }: Store<ResourceState>) {
		let result = await _svc.searchResources(state.query);
		if(!result) return;
		commit('SET_RESULT', result);
		return result;
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
