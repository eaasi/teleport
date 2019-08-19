import User from '@/models/auth/User';
import { make } from 'vuex-pathify';
import { Store } from 'vuex';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import _svc from '@/services/UserService';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiRole } from 'eaasi-auth';

/*============================================================
 == State
/============================================================*/

class UserState {
	activeUser?: User = null;
	query: IEaasiSearchQuery = new EaasiSearchQuery();
	usersResult: IEaasiSearchResponse<User> = null;
	roles: IEaasiRole[] = [];
}

const state = new UserState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

/*============================================================
 == Actions
/============================================================*/

const actions = {
	async getUsers({ commit, state }: Store<UserState>) {
		let usersResult = await _svc.getUsers(state.query);
		if (!usersResult) return;
		commit('SET_USERS_RESULT', usersResult);
	},

	async getUser(_store: Store<UserState>, userID: number) {
		return await _svc.getUser(userID);
	},

	async saveUser(_store: Store<UserState>, user: User) {
		if (user.id) return await _svc.updateUser(user);
		return await _svc.addUser(user);
	},

	async getRoles({ commit, state }: Store<UserState>) {
		let rolesResult = await _svc.getRoles();
		if (!rolesResult) return;
		commit('SET_ROLES', rolesResult.result);
	},
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
