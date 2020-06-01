import { IDrive } from '../emil/EmilEnvironmentData';
import { PhysicalFormat } from './Resource';

export interface ISortable {
	sortIndex: number;
}

export type ImportType = 'content' | 'software' | 'environment' | 'bulk';

export type ResourceImportPath = 'Fast'; // | 'Detailed' | 'Unselected';

export interface IResourceImportFile extends ISortable {
	physicalFormat?: PhysicalFormat;
	fileLabel?: string;
	name: string;
	file: File;
}

export interface IResourceImport {
	nativeConfig?: string;
	patchId?: string;
	templateId?: string;
	urlString?: string;
}

export interface IEnvironmentImportSnapshot {
	componentId: string;
	environmentId: string;
	isRelativeMouse?: boolean;
	importSaveDescription: string;
	title: string;
	objectId?: string;
	softwareId?: string;
	userId?: string;
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

export interface IImageImportPayload {
	nativeConfig: string;
	patchId: any;
	templateId: string;
	urlString: string;
}

export interface ICreateEnvironmentResponse {
	status: string;
	id: string;
}

/**
 * Used in a software or object request
 */
export interface IFileImport {
	filename: string;
	deviceId: string;
	url: string;
}


export interface ITemplate {
	abstractDataResource: ​​[];
	arch: string;
	checkpointBindingId: string;
	configurationType: string;
	description: IDescription;
	drive: IDrive[];
	emulator: IBean;
	id: string;
	installedSoftwareId: string[];
	isLinuxRuntime: boolean;
	metaDataVersion: string;
	model: any;
	nativeConfig: INativeConfig;
	nic: any;
	operatingSystemId: string;
	outputBindingId: string;
	timestamp: string;
	ui_options: IUIOptions;
}

export interface ITemplateProperty {
	name: string;
	value: string;
}

export interface IPatch {
	imageGeneralization: IImageGeneralization;
	description: IDescription;
	configurationType: string;
	metaDataVersion: string;
	id: string;
	timestamp: string;
}

export interface IImageGeneralization {
	precondition: IPatchPrecondition;
	modificationScript: string;
}

export interface IPatchPrecondition {
	fileSystem: string;
	partionLabel: string;
	requiredFiles: IPatchFiles;
}

export interface IPatchFiles {
	fileName: string[];
}

export interface IDescription {
	title: string;
}

export interface INativeConfig {
	value: string;
}

export interface IBean {
	bean: string;
}

export interface IUIOptions {
	html5: IUIOption;
}

export interface IUIOption {
	pointer_lock: boolean;
	crt: string;
}
