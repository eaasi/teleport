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
	authorized: boolean = false;
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

	async authorize({commit}, samlToken): Promise<boolean> {
		let res = await _authService.authorize(samlToken);
		if(!res || !res.user || !res.token) return false;
		commit('SET_USER_TOKEN', res.token);
		commit('SET_LOGGED_IN_USER', res.user);
		return true;
	},

	async validateToken(): Promise<boolean> {
		let token = localStorage.getItem(config.JWT_NAME);
		if(!token) return false;
		return await _authService.validateToken(token);
	},

	async logout({commit}) {
		localStorage.removeItem(config.JWT_NAME);
		// Do a full refresh to clear all application state
		location.assign(process.env.VUE_APP_BASE_URL);
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
