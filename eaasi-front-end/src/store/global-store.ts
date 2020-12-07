import Cookies from 'js-cookie';
import { make } from 'vuex-pathify';
import config from '@/config';
import User from '@/models/admin/User';
import _authService from '@/services/AuthService';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import { IAppError } from '@/types/AppError';
import { ILoginRequest } from '@/types/Auth';
import { IEaasiUser } from 'eaasi-admin';
import { IEaasiTab } from 'eaasi-nav';

/*============================================================
 == State
/============================================================*/

export class GlobalState {
	appVersion: string = config.APP_VERSION;
	adminMenuOpen: boolean = false;
	emulatorIsRunning: boolean = false;
	hideAppHeader: boolean = false;
	hideLeftMenu: boolean = false;
	loggedInUser: User = null;
	loginError: string = null;
	nodeName: string = config.NODE_NAME;
	userToken: string = null;
	appError: IAppError = null;
	showDebugErrors: boolean = config.SHOW_DEBUG_ERRORS == 'true';
	showLoader: boolean = false;
	driveId: number;
	permissions: PermissionResolver;
}

const state = new GlobalState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations['SET_DRIVE_ID'] = function(state: GlobalState, driveId: number) {
	state.driveId = driveId;
};

mutations['SET_PERMISSIONS'] = function(state: GlobalState, roleId: number) {
	state.permissions = new PermissionResolver(roleId);
};

mutations['SET_LOGGED_IN_USER'] = function(state: GlobalState, user: IEaasiUser) {
	const loggedInUser = new User(user);
	state.loggedInUser = loggedInUser;
	state.permissions = new PermissionResolver(loggedInUser.roleId);
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Auth
	============================================*/

	async logout(): Promise<void> {
		if (config.SAML_ENABLED) {
			const { redirectTo } = await _authService.logout();
			Cookies.remove(config.JWT_NAME, { path: '/'});
			window.location.assign(redirectTo);
		} else {
			await _authService.logout();
			Cookies.remove(config.JWT_NAME, { path: '/'});
			window.location.reload();
		}
  	},

	async initSession({ commit, state }): Promise<boolean> {
		if (state.loggedInUser) return true;
		let token = Cookies.get(config.JWT_NAME);
		if (!token) return false;
		let user = await _authService.getUserData();
		if (!user) return false;
		commit('SET_LOGGED_IN_USER', new User(user));
		return true;
	},

	async login({ dispatch }, loginRequest: ILoginRequest): Promise<boolean> {
		const success = await _authService.login(loginRequest);
		if (success) dispatch('initSession');
		return success;
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
