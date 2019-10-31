import EmilBaseService from './EmilBaseService';
import { TaskState } from '@/types/emil/Emil';

export default class EmilContainerService extends EmilBaseService {

	constructor() {
		super('EmilContainerData');
	}

	async getTaskState(taskID: number | string): Promise<TaskState> {
		if(isNaN(Number(taskID))) throw `taskID must be a string or number. Received ${taskID}`;
		let response = await this.get(`taskState?taskId=${taskID}`);
		return await response.json() as TaskState;
	}

}
