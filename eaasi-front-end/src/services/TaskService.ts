import BaseHttpService from './BaseHttpService';
import { ITaskState } from '@/types/Task';

/**
 * Handles requests related to container and environment tasks
 */
class TaskService extends BaseHttpService {
	/**
	 * Gets the state of a Container Task
	 * @param taskID: string container task ID
	 */
	async getTaskState(taskID: number | string): Promise<ITaskState | null> {
		let response = await this.get<ITaskState>(`/task/get-state?id=${taskID}`, {
			suppressSpinner: true
		});
		if (!response) return null;
		return response.result as ITaskState;
	}

	/**
	 * Gets the state of an Environment Task
	 * @param taskID: string environment task ID
	 */
	async getEnvironmentTaskState(taskID: number | string): Promise<ITaskState | null> {
		let response = await this.get<ITaskState>(`/task/get-environment-state?id=${taskID}`, {
			suppressSpinner: true
		});
		if (!response) return null;
		return response.result as ITaskState;
	}
}

export default new TaskService();