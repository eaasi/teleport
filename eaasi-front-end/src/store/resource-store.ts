import { make, commit } from 'vuex-pathify';
import _svc from '@/services/ResourceService';
import { IEaasiSearchResponse } from 'eaasi-http';
import { IResourceSearchQuery } from '@/types/Search.d.ts';
import { IEaasiResource } from '@/types/Resource';
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
