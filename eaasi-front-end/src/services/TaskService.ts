import BaseHttpService from './BaseHttpService';
import { ITaskState } from '@/types/Task';

class TaskService extends BaseHttpService {

	async getTaskState(taskID: number | string): Promise<ITaskState | null> {
		let response = await this.get<ITaskState>(`/task/get-state?id=${taskID}`);
		if(!response) return null;
		return response.result as ITaskState;
	}

}

export default new TaskService();