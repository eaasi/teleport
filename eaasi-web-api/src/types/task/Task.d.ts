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