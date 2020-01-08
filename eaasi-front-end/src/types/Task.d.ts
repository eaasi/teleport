
export interface ITaskState {
	isDone: boolean;
	status?: string;
	taskId: string | number;
	message?: string;
	description? :string;
	object?: string;
	userData?: any;
}