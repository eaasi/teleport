import { ITaskState } from '@/types/Task';

export default class EaasiTask implements ITaskState {
	isDone: boolean;
	status: string;
	taskId: number | string;
	isEmilTask: boolean = false;
	description: string;
	message: string;
	pollingInterval?: number = 1000;

	constructor(id: number | string, description?: string) {
		this.taskId = id;
		this.description = description;
	}

}