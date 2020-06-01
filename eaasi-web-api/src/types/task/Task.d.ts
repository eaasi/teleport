import { ResourceType } from '../resource/Resource';

export interface IEmilTask {
	taskId: string;
	isDone: boolean;
	userData?: JSON | string;
	object?: JSON | string;
	message?: string;
	status?: string;
}

export interface IEaasiTask extends IEmilTask {
	id: number;
	description?: string;
}

export interface IEaasiTaskState {
	taskType: string;
	successor?: JSON | string;
}

export interface IEaasiTaskSuccessor {
	userId?: number;
	resourceId?: string;
	resourceType?: ResourceType;
}