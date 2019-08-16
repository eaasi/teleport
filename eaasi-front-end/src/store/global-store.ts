import User from '@/models/auth/User';
import { make } from 'vuex-pathify';
import { Store } from 'vuex';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import _svc from '@/services/UserService';
import { IEaasiSearchQuery } from 'eaasi-http';

/*============================================================
 == State
/============================================================*/

class GlobalState {
	adminMenuOpen: boolean = false
}

const state = new GlobalState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

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
