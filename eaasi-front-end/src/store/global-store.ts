import Cookies from 'js-cookie';
import { make } from 'vuex-pathify';
import config from '@/config';
import User from '@/models/admin/User';
import _authService from '@/services/AuthService';
import _adminService from '@/services/AdminService';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import { IAppError } from '@/types/AppError';
import { KeycloakRole } from '@/types/Keycloak';
import { IKeycloakGroup } from 'eaasi-admin';
import { setUserToken } from '@/utils/auth';

/*============================================================
 == State
/============================================================*/

export class GlobalState {
	appVersion: string = config.APP_VERSION;
	buildVersion: string = config.BUILD_VERSION;
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
	group: IKeycloakGroup;
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

mutations['SET_LOGGED_IN_USER'] = function(state: GlobalState, user: User) {
	const loggedInUser = user;
	state.loggedInUser = loggedInUser;
	state.permissions = new PermissionResolver(loggedInUser.roleId);
};

mutations['SET_GROUP'] = function(state: GlobalState, group: IKeycloakGroup) {
	state.group = group;
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Auth
	============================================*/

	async logout(): Promise<void> {
		(window as any).keycloak.logout();
		Cookies.remove(config.JWT_NAME, { path: '/' });
  	},

	async initSession({ commit, state }): Promise<boolean> {
		if (state.loggedInUser) return true;
		const token = Cookies.get(config.JWT_NAME);
		if (!token) return false;
		const user = await _authService.getUserData();
		if (!user) return false;
		commit('SET_LOGGED_IN_USER', new User(user));
		if (user.orgname) {
			commit('SET_NODE_NAME', user.orgname);
		}
		if (user.roles.includes(KeycloakRole.EaasAdmin) && user.tid) {
			const group = await _adminService.getGroupInfo(user.tid);
			if (group) {
				commit('SET_GROUP', group);
			}
		}
		return true;
	},

	login({ dispatch }, jwt: string): void {
		setUserToken(jwt);
		dispatch('initSession');
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
