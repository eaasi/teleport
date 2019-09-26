import { make, commit } from 'vuex-pathify';
import _svc from '@/services/SoftwareService';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';

/*============================================================
 == State
/============================================================*/

class SoftwareState {
	query: IResourceSearchQuery = new ResourceSearchQuery();
	result: IResourceSearchResponse = null;
	activeSoftware: any = null;
}

const state = new SoftwareState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getSoftware(_store: Store<SoftwareState>, softwareId: string) {
		return await _svc.getSoftware(softwareId);
	},
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
