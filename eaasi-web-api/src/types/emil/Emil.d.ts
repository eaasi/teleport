import { Request } from 'express';
import { Blob } from 'node-fetch';

export interface KeyValuePair<T> {
	key: string;
	value: T;
}

export interface TaskState {
	isDone: boolean;
	status: string;
	taskId: string;
	userData?: object;
	object?: string;
}

/**
 * Request payload for importing Content file
 */
export interface IFileImport {
	filename: string;
	deviceId: string;
	url: string;
	fileFmt?: string;
}

/**
 * Request payload for importing Content file objects
 */
export interface IImportObjectRequest {
	files: IFileImport[];
	label: string;
}

/**
 * Request payload for EmilEnvironmentData/createEnvironment
 */
export interface ICreateEnvironmentPayload {
	nativeConfig: string;
	driveSettings: [];
	templateId: string;
	operatingSystemId: string;
	label: string;
}

export interface IImageImportPayload {
	url: string;
	label: string;
	imageType?: string;
}

export interface IUploadRequest extends Request {
	files: Blob[];
}

export interface IObjectClassificationRequest {
	archiveId: string;
	objectId: string;
	updateClassification: boolean;
	updateProposal: boolean;
}

export interface IEmilResult {
	status: '0' | '1';
	message: string;
}

export interface IImageDeletePayload {
	imageArchive: string;
	imageId: string;
}