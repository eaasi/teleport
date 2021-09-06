import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import EaasiTask from '@/models/task/EaasiTask';
import _svc from '@/services/AdminService';
import _taskSvc from '@/services/TaskService';
import { IApplicationLog } from '@/types/ApplicationLog';
import { IAddHarvesterRequest, IHarvesterSyncResult } from '@/types/Harvesters';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { ITaskState } from '@/types/Task';
import { IEaasiRole, IEmulator, IEmulatorEntry, IKeyboardSettings } from 'eaasi-admin';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

/*============================================================
 == State
/============================================================*/

export class AdminState {
	activeEmulator: IEmulator = null;
	activeUser: User = null;
	emulators: IEmulator[] = null;
	harvesters: string[] = [];
	usersResult: IEaasiSearchResponse<User> = null;
	usersQuery: IEaasiSearchQuery = new EaasiSearchQuery();
	roles: IEaasiRole[] = [];
	apiKey: string = '';
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

	async importEmulator(_: Store<AdminState>, req: EmulatorImportRequest): Promise<EaasiTask> {
		let taskState = await _svc.importEmulator(req);
		if (!taskState) return null;
		let description = req.update ? 'Updating' : 'Importing';
		return new EaasiTask(taskState.taskId, `${description} ${req.urlString} emulator`);
	},

	async setDefaultEmulatorVersion(_: Store<AdminState>, entry: IEmulatorEntry) {
		return await _svc.setDefaultEmulatorVersion(entry);
	},

	/* Users
	============================================*/

	async getUsers({ commit, state, rootState }) {
		let usersResult = await _svc.getUsers(state.usersQuery, rootState.group.id);
		if (!usersResult) return;
		commit('SET_USERS_RESULT', usersResult);
	},

	async saveUser({ rootState }, user: User): Promise<string> {
		return await _svc.saveUser(user, rootState.group.id);
	},

	async saveExistingUser({ rootState }, {user, roleUpdated}: {user: User, roleUpdated: boolean}): Promise<boolean> {
		return await _svc.saveExistingUser(user, roleUpdated, rootState.group.id);
	},

	async deleteUser({ rootState }, userId: string): Promise<boolean> {
		return await _svc.deleteUser(userId, rootState.group.id);
	},

	async getRoles({ commit }: Store<AdminState>) {
		let rolesResult = await _svc.getRoles();
		if (!rolesResult) return;

		// TODO: This is a cheap hack to hide the Manager role until user roles are designed
		// https://gitlab.com/eaasi/eaasi-client-dev/-/issues/605
		let roles = rolesResult.result.filter(r => r.roleName !== 'Manager');

		commit('SET_ROLES', roles);
	},

	/* OAI-PMH Harvesters
	============================================*/

	async getHarvesters({ commit }: Store<AdminState>): Promise<string[]> {
		let harvesters = await _svc.getHarvesters();
		if (!harvesters) return null;
		commit('SET_HARVESTERS', harvesters);
		return harvesters;
	},

	async addHarvester({ dispatch }: Store<AdminState>, req: IAddHarvesterRequest): Promise<boolean> {
		let success = await _svc.addHarvester(req);
		if (!success) return false;
		await dispatch('getHarvesters');
		return true;
	},

	async updateHarvester({ dispatch }: Store<AdminState>, {name, req}: {name: string, req: IAddHarvesterRequest}): Promise<boolean> {
		let success = await _svc.updateHarvester(name, req);
		if (!success) return false;
		await dispatch('getHarvesters');
		return true;
	},

	async syncHarvester(_, { name, full }: { name: string, full: boolean}): Promise<IHarvesterSyncResult> {
		return await _svc.syncHarvester(name, full);
	},

	async deleteHarvester({ dispatch }: Store<AdminState>, name: string): Promise<boolean> {
		let success = await _svc.deleteHarvester(name);
		if (!success) return false;
		await dispatch('getHarvesters');
		return true;
	},

	async getHarvester({ dispatch }: Store<AdminState>, name: string): Promise<IAddHarvesterRequest> {
		return _svc.getHarvester(name);
	},

	async resetPassword({ rootState }, {id, email}: {id: string, email: string}): Promise<string> {
		return await _svc.resetUserPassword(id, email, rootState.group.id);
	},

	/* Tasks
	============================================*/
	async getTaskState(_, taskId: string): Promise<ITaskState> {
		let taskState = await _taskSvc.getTaskState(taskId);
		if (!taskState) return null;
		// TODO: Can refactor to store state in a map { taskId: taskState }
		// TODO: Then, sync the map to the active tasks table view
		return taskState;
	},

	/* Error Logs
	============================================*/
	async getErrorLogs(_): Promise<IApplicationLog[]> {
		return await _svc.getErrorLogs();
	},

	async getMostRecentErrorLogs(_): Promise<IApplicationLog[]> {
		return await _svc.getMostRecentErrorLogs();
	},

	/*
	Node Preferences
	============================================*/
	getKeyboardSettings(_): IKeyboardSettings {
		return _svc.getKeyboardSettings();
	},

	setKeyboardSettings(_, keyboardSettings: IKeyboardSettings) {
		_svc.setKeyboardSettings(keyboardSettings);
	},

	async dbDataMigration(_) {
		return await _svc.dbDataMigration();
	},

	async syncEnvironments(_) {
		return await _svc.syncEnvironments();
	},

	async getApiKey({ commit }: Store<AdminState>) {
		const res = await _svc.getApiKey();
		commit('SET_API_KEY', res.apikey);
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