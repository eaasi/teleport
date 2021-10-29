import config from '@/config';
import { IEaasiSearchResponse } from '@/types/Search';
import { ITaskState } from '@/types/Task';
import BaseHttpService from './BaseHttpService';

/**
 * Handles requests related to container and environment tasks
 */
class TaskService extends BaseHttpService {
	/**
	 * Gets the state of a Container Task
	 * @param taskID: string container task ID
	 */
	async getTaskState(taskId: number | string): Promise<ITaskState | null> {
		const response = await this.get<ITaskState>(`${config.REST_API_URL}/eaasi-task/get-state/${taskId}`, {
			suppressSpinner: true
		});
		if (!response) return null;
		return response.result;
	}

	/**
	 * Gets the state of an Environment Task
	 * @param taskID: string environment task ID
	 */
	async getEnvironmentTaskState(taskId: number | string): Promise<ITaskState | null> {
		const response = await this.get<ITaskState>(`${config.REST_API_URL}/eaasi-task/get-environment-state?id=${taskId}`, {
			suppressSpinner: true
		});
		if (!response) return null;
		return response.result;
	}

	async deleteTask(id: number): Promise<void> {
		await this.delete(`${config.REST_API_URL}/eaasi-task/${id}`, {
			suppressSpinner: true
		});
	}

	async getAllTasks(): Promise<ITaskState[]> {
		const { result } = await this.get<IEaasiSearchResponse<ITaskState>>(`${config.REST_API_URL}/eaasi-task/`, {
			suppressSpinner: true
		});
		const tasks = result && result.result.length ? result.result : [];
		return tasks;
	}

	async updateTask(task: ITaskState): Promise<ITaskState> {
		const response = await this.post<ITaskState>(`${config.REST_API_URL}/eaasi-task/`, task, {
			suppressSpinner: true
		});
		if (!response) return null;
		return response.result;
	}
}

export default new TaskService();