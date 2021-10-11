import { ITaskState } from '@/types/Task';

export default class EaasiTask implements ITaskState {
	id: number;
	isDone: boolean;
	status: string;
	taskId: number | string;
	isEmilTask: boolean = false;
	description: string;
	message: string;
	pollingInterval?: number = 1000;
	userData?: any;
	object?: any;
	type?: string;

	constructor(id: number | string, description?: string, type?: string) {
		this.taskId = id;
		this.description = description;
		this.type = type;
	}

}