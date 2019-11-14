import { make } from 'vuex-pathify';
import {IAppError} from '@/types/AppError';
import config from '@/config';
import Cookies from 'js-cookie';
import _authService from '@/services/AuthService';
import _taskService from '@/services/TaskService';
import { ITaskState } from '@/types/Task';
import EaasiTask from '@/models/task/EaasiTask';
import { Store } from 'vuex';
import User from '@/models/admin/User';

/*============================================================
 == State
/============================================================*/

class GlobalState {
	readonly appVersion: string = config.APP_VERSION;
	activeTask: EaasiTask = null;
	runningTasks: EaasiTask[] = [];
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
}

const state = new GlobalState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations['ADD_OR_UPDATE_TASK'] = function(state: GlobalState, task: ITaskState) {
	let existingTask = state.runningTasks.find(x => x.taskId == task.taskId) || task as EaasiTask;
	let otherTasks = state.runningTasks.filter(x => x.taskId != task.taskId);
	let newTask = { ...existingTask, ...task };
	state.runningTasks = [ ...otherTasks, newTask ];
};

mutations['REMOVE_TASK'] = function(state: GlobalState, taskId: string | number) {
	state.runningTasks = state.runningTasks.filter(x => x.taskId != taskId);
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
		if(state.loggedInUser) return true;
		let token = Cookies.get(config.JWT_NAME);
		if(!token) return false;
		let user = await _authService.getUserData();
		if(!user) return false;
		commit('SET_LOGGED_IN_USER', new User(user));
		return true;
	},

	/* Tasks
	============================================*/

	async getTaskState(store: Store<GlobalState>, taskID: number | string) {
		let res = await _taskService.getTaskState(taskID);
		if(!res) return null;
		res.taskId = taskID;
		store.commit('ADD_OR_UPDATE_TASK', res);
		return res;
	},

	async getEnvironmentTaskState(store: Store<GlobalState>, taskID: number | string) {
		let res = await _taskService.getEnvironmentTaskState(taskID);
		if(!res) return null;
		res.taskId = taskID;
		store.commit('ADD_OR_UPDATE_TASK', res);
		return res;
	},
};

/*============================================================
 == Getters
/============================================================*/

const getters = {

	loggedIn(state) {
		return !!state.loggedInUser;
	}

};

export default {
	state,
	mutations,
	actions,
	getters
};
