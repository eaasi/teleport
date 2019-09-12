import { make } from 'vuex-pathify';
import _svc from '@/services/AdminService';
import { ImportType } from 'eaasi-import';

/*============================================================
 == State
/============================================================*/

class ImportState {
	importStep: number = 0;
	importType: ImportType = null;
}

const state = new ImportState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations.RESET_STATE = (state) => {
	state.importStep = 0;
	state.importType = null;
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

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
