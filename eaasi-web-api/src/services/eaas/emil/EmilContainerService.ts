import HttpJSONService from '@/services/base/HttpJSONService';
import EmilBaseService from './EmilBaseService';
import { TaskState } from '@/types/emil/Emil';

export default class EmilContainerService extends EmilBaseService {

	constructor(httpService = new HttpJSONService()) {
		super('EmilContainerData', httpService);
	}

	async getTaskState(taskID: number | string): Promise<TaskState> {
		if(isNaN(Number(taskID))) throw `taskID must be a string or number. Received ${taskID}`;
		let response = await this.get(`taskState?taskId=${taskID}`);
		return await response.json() as TaskState;
	}

}
