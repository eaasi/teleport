import HttpJSONService from '@/services/base/HttpJSONService';
import {TaskState} from '@/types/emil/Emil';
import EmilBaseService from './EmilBaseService';
import { IEnvironment } from '@/types/emil/EmilEnvironmentData';

export default class EmilEnvironmentService extends EmilBaseService {

	constructor(httpService = new HttpJSONService()) {
		super('EmilEnvironmentData', httpService);
	}

	/**
	 * Gets aliases and entries for EaaSi Emulators
	 */
	async getNameIndexes() {
		return await this.get('getNameIndexes');
	}

	/**
	 * Gets the Environment Task State for a given taskID
	 * @param taskID
	 */
	async getEnvironmentTaskState(taskID: number | string): Promise<TaskState> {
		if (isNaN(Number(taskID))) {
			throw `taskID must be a string or number. Received ${taskID}`;
		}
		let response = await this.get(`taskState?taskId=${taskID}`);
		return await response.json() as TaskState;
	}

	async updateDescription(env: IEnvironment) {
		const response = await this.post('updateDescription', env);
		const result = await response.json();
		return result;
	}
}
