import { make } from 'vuex-pathify';
import { Store } from 'vuex';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiRole } from 'eaasi-admin';
import { IEmulator } from '@/types/Emulator';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import User from '@/models/auth/User';
import _svc from '@/services/AdminService';

/*============================================================
 == State
/============================================================*/

export class AdminState {
	activeUser?: User = null;
	emulatorsResult: IEaasiSearchResponse<IEmulator> = null;
	emulatorsQuery: IEaasiSearchQuery = new EaasiSearchQuery();
	usersResult: IEaasiSearchResponse<User> = null;
	usersQuery: IEaasiSearchQuery = new EaasiSearchQuery();
	roles: IEaasiRole[] = [];
}

const state = new AdminState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {

	/* Emulators
	============================================*/

	async getEmulators({ commit, state }: Store<AdminState>) {
		let result = await _svc.getEmulators(state.emulatorsQuery);
		if (!result) return;
		commit('SET_EMULATORS_RESULT', result);
	},

	/* Users
	============================================*/

	async getUsers({ commit, state }: Store<AdminState>) {
		let usersResult = await _svc.getUsers(state.usersQuery);
		if (!usersResult) return;
		commit('SET_USERS_RESULT', usersResult);
	},

	async getUser(_store: Store<AdminState>, userID: number) {
		return await _svc.getUser(userID);
	},

	async saveUser(_store: Store<AdminState>, user: User) {
		if (user.id) return await _svc.updateUser(user);
		return await _svc.addUser(user);
	},

	async getRoles({ commit }: Store<AdminState>) {
		let rolesResult = await _svc.getRoles();
		if (!rolesResult) return;
		commit('SET_ROLES', rolesResult.result);
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