import {Request} from 'express';
import {Blob} from 'node-fetch';

export interface KeyValuePair<T> {
	key: string;
	value: T;
}

export interface TaskState {
	isDone: boolean;
	status: string;
	taskId: string;
}

/**
 * Request payload for importing Content file
 */
export interface IFileImport {
	filename: string;
	deviceId: string;
	url: string;
}

/**
 * Request payload for importing Content file objects
 */
export interface IImportObjectRequest {
	files: IFileImport[];
	label: string;
}

export interface IUploadRequest extends Request {
	files: Blob[];
}
