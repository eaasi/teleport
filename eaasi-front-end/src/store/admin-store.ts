import { make, commit } from 'vuex-pathify';
import { Store } from 'vuex';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiRole, IEmulator, IEmulatorEntry } from 'eaasi-admin';
import { IAddHarvesterRequest, IHarvesterSyncResult } from '@/types/Harvesters';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import User from '@/models/admin/User';
import _svc from '@/services/AdminService';
import _taskSvc from '@/services/TaskService';
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
	harvesters: string[] = [];
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
		if (!taskState) return null;
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

	async saveUser(_store: Store<AdminState>, user: User) {
		return await _svc.saveUser(user);
	},

	async getRoles({ commit }: Store<AdminState>) {
		let rolesResult = await _svc.getRoles();
		if (!rolesResult) return;
		commit('SET_ROLES', rolesResult.result);
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
		dispatch('getHarvesters');
		return true;
	},

	async syncHarvester(_, { name, full }: { name: string, full: boolean}): Promise<IHarvesterSyncResult> {
		return await _svc.syncHarvester(name, full);
	},

	async deleteHarvester({ dispatch }: Store<AdminState>, name: string): Promise<boolean> {
		let success = _svc.deleteHarvester(name);
		if (!success) return false;
		dispatch('getHarvesters');
		return true;
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