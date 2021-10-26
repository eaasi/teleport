import { TaskState } from '@/types/emil/Emil';
import EmilBaseService from '../base/EmilBaseService';

export default class EmilTaskService {

	private readonly _svc: EmilBaseService;

	constructor(
		svc: EmilBaseService = new EmilBaseService('tasks'),
	) {
		this._svc = svc;
	}

	/**
	 * Gets the Container Task State for a given taskID
	 * @param taskId
	 * @param token
	 */
	async getTaskState(taskId: number | string, token?: string): Promise<TaskState> {
		if (!taskId) {
			throw 'taskId must not be empty';
		}
		if (typeof taskId !== 'string' && typeof taskId !== 'number') {
			throw `taskId must be a string or number. Received: ${taskId}`;
		}
		let response = await this._svc.get(`${taskId}`, token);
		return await response.json() as TaskState;
	}

	async deleteTask(taskId: number | string, token?: string): Promise<void> {
		if (!taskId) {
			throw 'taskId must not be empty';
		}
		if (typeof taskId !== 'string' && typeof taskId !== 'number') {
			throw `taskId must be a string or number. Received: ${taskId}`;
		}
		await this._svc.delete(`${taskId}`, null, token)
	}

}