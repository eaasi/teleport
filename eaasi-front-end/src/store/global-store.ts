import { make } from 'vuex-pathify';
import _authService from '@/services/AuthService';
import _userService from '@/services/UserService';
import { IEaasiUser } from 'eaasi-auth';
import { validateUserToken } from '@/utils/auth';

const JWT_NAME = process.env.VUE_APP_JWT_NAME;

/*============================================================
 == State
/============================================================*/

class GlobalState {
	adminMenuOpen: boolean = false;
	authorized: boolean = false;
	loggedInUser: IEaasiUser = null;
	// TODO: nodeName should come from the deployment config or be managed in the node admin
	nodeName: string = 'PortalMedia Inc';
	userToken: string = null;
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

	async authorize({commit}, {userid}): Promise<boolean> {
		let res = await _authService.authorize(userid);
		if(!res || !res.token || !res.user) return false;
		let user = validateUserToken(res.token);
		if(!user) return false;
		commit('SET_USER_TOKEN', res.token);
		commit('SET_LOGGED_IN_USER', res.user);
	},

	async logout({commit}) {
		commit('SET_USER_TOKEN', null);
		commit('SET_LOGGED_IN_USER', null);
		localStorage.removeItem(JWT_NAME);
		// Do a full refresh to clear all application state
		location.reload();
	},

	async validateToken({commit, state}) {
		let token = state.userToken || localStorage.getItem(JWT_NAME);
		let user = null;
		if(token) user = validateUserToken(token);

		if(state.loggedInUser === null || user === null) {
			commit('SET_LOGGED_IN_USER', user);
		}

		if(token !== state.userToken) {
			commit('SET_USER_TOKEN', !!user ? token : null);
		}

		if(state.authorized !== !!user) {
			commit('SET_AUTHORIZED', !!user);
		}

		return !!user;
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
