import { PhysicalFormat } from './Resource';

export interface ISortable {
	sortIndex: number
}

export type ImportType = 'content' | 'software' | 'environment' | 'bulk';

export type ResourceImportPath = 'Fast'; // | 'Detailed' | 'Unselected';

export interface IResourceImportFile extends ISortable {
	physicalFormat?: PhysicalFormat,
	fileLabel?: string,
	name: string,
	file: File,
}

export interface IResourceImport {
	nativeConfig?: string,
	patchId?: string,
	templateId?: string,
	urlString?: string
}

export interface IEnvironmentImportSnapshot {
	componentId: string;
	environmentId: string,
	isRelativeMouse?: boolean,
	importSaveDescription: string,
	title: string,
	objectId?: string,
	softwareId?: string,
	userId?: string
}

/**
 * Used when a content or software object import request is made
 */
export interface IImportObjectRequest {
	files: IFileImport[];
	label: string;
	userId?: number;
}

/**
 * Request payload for EmilEnvironmentData/createEnvironment
 */
export interface ICreateEnvironmentPayload {
	nativeConfig: string;
	size: string;
	templateId: string;
}

/**
 * Used in a software or object request
 */
export interface IFileImport {
	filename: string;
	deviceId: string;
	url: string;
}
