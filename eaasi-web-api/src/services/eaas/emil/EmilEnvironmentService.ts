import {TaskState} from '@/types/emil/Emil';
import EmilBaseService from './EmilBaseService';

export default class EmilEnvironmentService extends EmilBaseService {

	constructor() {
		super('EmilEnvironmentData');
	}

	/**
	 * Gets aliases and entries for EaaSi Emulators
	 */
	async getNameIndexes() {
		return await this.get('getNameIndexes');
	}

	async getEnvironmentTaskState(taskID: number | string): Promise<TaskState> {
		if (isNaN(Number(taskID))) throw `taskID must be a string or number. Received ${taskID}`;
		let response = await this.get(`taskState?taskId=${taskID}`);
		return await response.json() as TaskState;
	}
}
