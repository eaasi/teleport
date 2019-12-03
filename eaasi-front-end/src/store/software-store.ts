import { make, commit } from 'vuex-pathify';
import _svc from '@/services/SoftwareService';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';
import { Store } from 'vuex';
import { IObjectClassificationRequest, ISoftwareObject } from '@/types/Resource';

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

	async getSoftware(_: Store<SoftwareState>, softwareId: string) {
		return await _svc.getSoftware(softwareId);
	},

	async getSoftwareObject(_: Store<SoftwareState>, softwareId: string) {
		return await _svc.getSoftwareObject(softwareId);
	},

	async classify(_: Store<SoftwareState>, classificationRequest: IObjectClassificationRequest) {
		return await _svc.classify(classificationRequest);
	},

	async getSoftwareMetadata(_: Store<SoftwareState>, softwareId: string) {
		return await _svc.getSoftwareMetadata(softwareId);
	},

	async saveSoftwareObject(_: Store<SoftwareState>, softwareObject: ISoftwareObject) {
		return await _svc.saveSoftwareObject(softwareObject);
	},

	async searchSoftware({ state, commit }: Store<SoftwareState>) {
		let result = await _svc.searchSoftware(state.query);
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
