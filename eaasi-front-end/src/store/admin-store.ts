import { make } from 'vuex-pathify';
import { Store } from 'vuex';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiRole, IEmulator, IEmulatorEntry } from 'eaasi-admin';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import User from '@/models/admin/User';
import _svc from '@/services/AdminService';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import { ITaskState } from '@/types/Task';
import EaasiTask from '@/models/task/EaasiTask';

/*============================================================
 == State
/============================================================*/

export class AdminState {
	activeEmulator: IEmulator = null;
	activeUser: User = null;
	emulators: IEmulator[] = null;
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

	async getEmulators({ commit }: Store<AdminState>) {
		let result = await _svc.getEmulators();
		if (!result) return;
		commit('SET_EMULATORS', result);
	},

	async importEmulator(store: Store<AdminState>, req: EmulatorImportRequest): Promise<EaasiTask> {
		let taskState = await _svc.importEmulator(req) as ITaskState;;
		if(!taskState) return null;
		let description = req.update ? 'Updating' : 'Importing';
		let task = new EaasiTask(taskState.taskId, `${description} ${req.urlString} emulator`);
		store.commit('ADD_OR_UPDATE_TASK', task, { root: true});
		return task;
	},

	async setDefaultEmulatorVersion(store: Store<AdminState>, entry: IEmulatorEntry) {
		return await _svc.setDefaultEmulatorVersion(entry);
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