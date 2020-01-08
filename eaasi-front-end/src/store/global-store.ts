import config from '@/config';
import User from '@/models/admin/User';
import _authService from '@/services/AuthService';
import { IAppError } from '@/types/AppError';
import Cookies from 'js-cookie';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/

class GlobalState {
	appVersion: string = config.APP_VERSION;
	adminMenuOpen: boolean = false;
	emulatorIsRunning: boolean = false;
	hideAppHeader: boolean = false;
	hideLeftMenu: boolean = false;
	loggedInUser: User = null;
	loginError: string = null;
	nodeName: string = 'PortalMedia Inc';
	userToken: string = null;
	appError: IAppError = null;
	showDebugErrors: boolean = config.SHOW_DEBUG_ERRORS == 'true';
	showLoader: boolean = false;
	driveId: number;
}

const state = new GlobalState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations['SET_DRIVE_ID'] = function(state: GlobalState, driveId: number) {
	state.driveId = driveId;
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Auth
	============================================*/

	async logout() {
		Cookies.remove(config.JWT_NAME);
		// Do a full refresh to clear all application state
		location.assign(process.env.VUE_APP_BASE_URL);
	},

	async initSession({commit, state}) {
		if (state.loggedInUser) return true;
		let token = Cookies.get(config.JWT_NAME);
		if (!token) return false;
		let user = await _authService.getUserData();
		if (!user) return false;
		commit('SET_LOGGED_IN_USER', new User(user));
		return true;
	},

};

/*============================================================
 == Getters
/============================================================*/

const getters = {

	loggedIn(state) {
		return !!state.loggedInUser;
	},

};

export default {
	state,
	mutations,
	actions,
	getters
};
