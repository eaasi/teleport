import { make, commit } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IEaasiSearchResponse } from 'eaasi-http';
import { IResourceSearchQuery } from 'eaasi-search';
import { IEaasiResource, IEaasiResource } from '@/types/Resource';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';

/*============================================================
 == State
/============================================================*/

class ResourceState {
	activeResource: IEaasiResource = null;
	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IEaasiSearchResponse<IEaasiResource> = null;
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
	async searchResources(store: Store<ResourceState>, query: IResourceSearchQuery) {
		let searchQuery = query || state.query;
		let result = await _svc.searchResources(searchQuery);
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
