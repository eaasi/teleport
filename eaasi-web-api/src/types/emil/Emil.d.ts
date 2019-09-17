export interface KeyValuePair<T> {
	key: string;
	value: T;
}

export interface TaskState {
	isDone: boolean;
	status: string;
	taskId: string;
}