export interface IEmilTask {
	taskId: string;
	isDone: boolean;
	userData?: string;
	object?: string;
	message?: string;
	status?: string;
}

export interface IEaasiTask extends IEmilTask {
	id: number;
	description?: string;
	tenantId: string;
	type?: string;
}

export interface IEaasiTaskState {
	taskType: string;
	successor?: string;
}

export interface IEaasiTaskSuccessorRequest {
	taskId: number;
	emulationProjectId: number;
	type: SuccessorType;
	userId: string;
	envId: string;
}

export interface IEaasiTaskSuccessor extends IEaasiTaskSuccessorRequest {
	task: IEaasiTask;
}

export type SuccessorType = 'add-after-replication';