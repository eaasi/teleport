import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import EaasiTask from '@/models/task/EaasiTask';
import _svc from '@/services/AdminService';
import _taskSvc from '@/services/TaskService';
import { IApplicationLog } from '@/types/ApplicationLog';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { ITaskState } from '@/types/Task';
import { IEaasiRole, IEmulator, IEmulatorEntry, IKeyboardSettings } from 'eaasi-admin';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';
import { ContainerImageBuilder, EmulatorBuilder } from 'EaasClient/lib/containerBuilder';
import config from '@/config';
import { getUserToken } from '@/utils/auth';
import { taskTypes } from '@/utils/constants';
import { IEaasiTask } from '../../../eaasi-web-api/src/types/task/Task';
import { IDefaultEmulators } from '@/types/IEmulator';
import EmulatorService from '@/services/EmulatorService';

const emulatorService = new EmulatorService();

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

	async getEmulators({ commit }: Store<AdminState>, emulators: IDefaultEmulators) {
		const result = await _svc.getEmulators();
		if (!result) return;
		commit('SET_EMULATORS', emulatorService.createEmulatorList(emulators, result));
	},

	async importEmulator(_: Store<AdminState>, req: EmulatorImportRequest): Promise<EaasiTask> {
		const imageBuilder = new ContainerImageBuilder(req.urlString, 'dockerhub');
		imageBuilder.setTag((req.tag) ? req.tag : 'latest');
		const taskState = await imageBuilder.build(config.EMIL_SERVICE_ENDPOINT + '/', getUserToken);
		if (!taskState) return null;
		return new EaasiTask(taskState.taskId, `Building container image: ${req.urlString}`, taskTypes.IMPORT_EMULATOR);
	},

	async buildEmulator({ dispatch }, importEmulatorTask: IEaasiTask) {
		const object = JSON.parse(importEmulatorTask.object);
		const emulatorBuilder = new EmulatorBuilder(object.containerUrl, object.metadata);
		const importResult = await emulatorBuilder.build(config.EMIL_SERVICE_ENDPOINT + '/', getUserToken);
		const containerSourceUrl = object.metadata ? object.metadata.containerSourceUrl : null;
		const task = new EaasiTask(importResult.taskId, `Importing emulator${containerSourceUrl ? ': ' + containerSourceUrl : ''}`);
		await dispatch('task/addTaskToQueue', task, { root: true });
	},

	async setDefaultEmulatorVersion(_: Store<AdminState>, id: string) {
		return await _svc.setDefaultEmulatorVersion(id);
	},

	/* Users
	============================================*/

	async getUsers({ commit, state, rootState }) {
		const usersResult = await _svc.getUsers(state.usersQuery, rootState.group.id);
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
		const rolesResult = await _svc.getRoles();
		if (!rolesResult) return;

		// TODO: This is a cheap hack to hide the Manager role until user roles are designed
		// https://gitlab.com/eaasi/eaasi-client-dev/-/issues/605
		const roles = rolesResult.result.filter(r => r.roleName !== 'Manager');

		commit('SET_ROLES', roles);
	},


	async resetPassword({ rootState }, {id, email}: {id: string, email: string}): Promise<string> {
		return await _svc.resetUserPassword(id, email, rootState.group.id);
	},

	/* Tasks
	============================================*/
	async getTaskState(_, taskId: string): Promise<ITaskState> {
		const taskState = await _taskSvc.getTaskState(taskId);
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

	async getApiKey({ commit }: Store<AdminState>) {
		const res = await _svc.getApiKey();
		commit('SET_API_KEY', res.apikey);
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