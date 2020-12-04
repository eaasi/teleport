
export interface IEaasiTaskSuccessor {
	taskId: number;
	emulationProjectId: number;
	envId: string;
	type: SuccessorType;
}

export type SuccessorType = 'add-after-replication';

export interface ITaskState {
	isDone: boolean;
	status?: string;
	taskId: string | number;
	message?: string;
	description? :string;
	object?: string;
	userData?: any;
}