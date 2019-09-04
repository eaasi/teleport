import { make } from 'vuex-pathify';
import _authService from '@/services/AuthService';
import { IEaasiUser } from 'eaasi-auth';
import {IAppError} from '@/types/AppError';
import config from '@/config';

/*============================================================
 == State
/============================================================*/

class GlobalState {
	adminMenuOpen: boolean = false;
	loggedInUser: IEaasiUser = null;
	loginError: string = null;
	// TODO: nodeName should come from the deployment config or be managed in the node admin
	nodeName: string = 'PortalMedia Inc';
	userToken: string = null;
	appError: IAppError = null;
	showDebugErrors: boolean = config.SHOW_DEBUG_ERRORS == 'true';
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

	async logout({commit}) {
		localStorage.removeItem(config.JWT_NAME);
		// Do a full refresh to clear all application state
		location.assign(process.env.VUE_APP_BASE_URL);
	},

	async verifyUserData({commit, state}) {
		if(state.loggedInUser) return false;;
		let user = await _authService.getUserData();
		if(!user) return false;
		commit('SET_LOGGED_IN_USER', user);
		return true;
	}

};

/*============================================================
 == Getters
/============================================================*/

const getters = {

	loggedIn(state) {
		return !!state.loggedInUser;
	}

};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
