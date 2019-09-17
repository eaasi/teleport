export interface ITaskState {
	isDone: boolean;
	status?: string;
	taskId: string | number;
	message?: string;
}