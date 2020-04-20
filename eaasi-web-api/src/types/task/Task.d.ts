import { ResourceType } from '../resource/Resource';

export interface IEaasiTask {
	id: number;
	taskId: string;
	description?: string;
	isDone: boolean;
	status?: string;
	message?: string;
	userData?: JSON | string;
	object?: JSON | string;
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