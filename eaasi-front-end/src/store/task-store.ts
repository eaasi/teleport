import { generateCompletedTaskNotification, generateNotificationError, generateTaskNotification } from '@/helpers/NotificationHelper';
import EaasiTask from '@/models/task/EaasiTask';
import TaskPreferenceService from '@/services/TaskPreferenceService';
import _taskService from '@/services/TaskService';
import { ITaskState } from '@/types/Task';
import eventBus from '@/utils/event-bus';
import { Store } from 'vuex';
import { make } from 'vuex-pathify';

const taskPreferenceSvc = new TaskPreferenceService();

/*============================================================
 == State
/============================================================*/
class TaskState {
	taskQueue: EaasiTask[] = [];
}

const state = new TaskState();

/*============================================================
 == Mutations
/============================================================*/

const mutations = make.mutations(state);

mutations['ADD_OR_UPDATE_TASK'] = function(state: TaskState, task: ITaskState) {
	let existingTask = state.taskQueue.find(x => x.taskId == task.taskId) || task as EaasiTask;
	let otherTasks = state.taskQueue.filter(x => x.taskId != task.taskId);
	let newTask = { ...existingTask, ...task };
	state.taskQueue = [ ...otherTasks, newTask ];
};

mutations['REMOVE_TASK'] = function(state: TaskState, id: number) {
	state.taskQueue = state.taskQueue.filter(t => t.id !== id);
};

/*============================================================
 == Actions
/============================================================*/

const actions = {

	async getTaskState({ commit, dispatch, state }: Store<TaskState>, taskId: number | string) {
		const existingTask =  state.taskQueue.find(t => t.taskId === taskId);
		if (existingTask && existingTask.isDone) return;
		let task = await _taskService.getTaskState(taskId);
		if (!task) {
			const message = `Can't retrieve task with taskId ${taskId}`;
			eventBus.$emit('notification:show', generateNotificationError(message));
			return null;
		} else if (task.isDone) {
			if (task.userData) task.userData = JSON.parse(task.userData);
			dispatch('onTaskComplete', task);
		}
		commit('ADD_OR_UPDATE_TASK', task);
		return task;
	},

    async getEnvironmentTaskState({ commit }: Store<TaskState>, taskId: number | string) {
		let res = await _taskService.getEnvironmentTaskState(taskId);
		if (!res) return null;
		res.taskId = taskId;
		commit('ADD_OR_UPDATE_TASK', res);
		return res;
    },

    async addTaskToQueue({ commit, dispatch }: Store<TaskState>, task: EaasiTask): Promise<ITaskState> {
        let taskState: ITaskState = await dispatch('getTaskState', task.taskId);
        if (taskState.status != '0') return null;
        let eaasiTask = await dispatch('updateTask', Object.assign(taskState, task));
		if (!eaasiTask) return null;
		commit('ADD_OR_UPDATE_TASK', eaasiTask);
		eventBus.$emit('task-manager:show', true);
		eventBus.$emit('notification:show', generateTaskNotification(task));
        return taskState;
    },

    async getAllTasks({ commit }) {
        let tasks = await _taskService.getAllTasks();
		commit('SET_TASK_QUEUE', tasks);
		return tasks;
    },

    async deleteTask({ commit }: Store<TaskState>, id: number) {
		commit('REMOVE_TASK', id);
		await _taskService.deleteTask(id);
    },

    async updateTask(_, task: ITaskState) {
        return await _taskService.updateTask(task);
	},

	onTaskComplete(_: Store<TaskState>, task: EaasiTask) {
		eventBus.$emit('notification:show', generateCompletedTaskNotification(task));
	}

};

/*============================================================
 == Getters
/============================================================*/

const getters = {

    orderedTasks(state): EaasiTask[] {
		if (state.taskQueue && state.taskQueue.length > 0) {
			const sortedTasks = state.taskQueue.sort((a, b) => Number(a.isDone) - Number(b.isDone));
			return sortedTasks;
		}
		return [];
	},

	activePollingTask(state): EaasiTask {
		const pendingTasks: EaasiTask[] = state.taskQueue.filter(t => !t.isDone && t.status === '0');
		if (pendingTasks.length < 1) return null;
		return pendingTasks.sort((a, b) => Number(a.taskId) - Number(b.taskId))[0];
	},

	completedTasks(state): EaasiTask[] {
		const completedTasks: EaasiTask[] = state.taskQueue.filter(t => t.isDone);
		if (completedTasks.length < 1) return [];
		return completedTasks.sort((a, b) => Number(a.taskId) - Number(b.taskId));
	},

	incompletedTasks(state): EaasiTask[] {
		const completedTasks: EaasiTask[] = state.taskQueue.filter(t => !t.isDone);
		if (completedTasks.length < 1) return [];
		return completedTasks.sort((a, b) => Number(a.taskId) - Number(b.taskId));
	},

};

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
};
