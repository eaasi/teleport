import { make, commit } from 'vuex-pathify';
import _svc from '@/services/UserService';
import { IEaasiUser } from 'eaasi-auth';
import User from '@/models/auth/User';

/*============================================================
 == State
/============================================================*/

class GlobalState {
	adminMenuOpen: boolean = false;
	// TODO: This should come from the deployment config or be managed in the node admin
	nodeName: string = 'PortalMedia Inc';
	loggedInUser: IEaasiUser = null;
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

	async login({commit}) {
		// TODO: Check localstorage for JWT and validate in service layer
		const fakeUser = new User();
		fakeUser.firstName = 'Test';
		fakeUser.lastName = 'Tester';
		fakeUser.roleId = 1;
		fakeUser.username = 'TestTester01';
		commit('SET_LOGGED_IN_USER', fakeUser);
		return true;
	},

	async logout({commit}) {
		// TODO: Will likely need to clear other application state
		commit('SET_LOGGED_IN_USER', null);
	}

};

/*============================================================
 == Getters
/============================================================*/

const getters = {

	isLoggedIn(state: GlobalState) {
		// TODO: Need token validation
		return state.loggedInUser !== null;
	}

};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
