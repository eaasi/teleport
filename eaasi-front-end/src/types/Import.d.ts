import {IDrive, IDriveSetting, IInstalledSoftware, PhysicalFormat} from './Resource';

export type ImportType = 'content' | 'software' | 'environment' | 'bulk' | 'image';

export type ResourceImportPath = 'Fast'; // | 'Detailed' | 'Unselected';

export interface IResourceImportFile {
	physicalFormat?: PhysicalFormat;
	fileLabel?: string;
	sortIndex?: number;
	name: string;
	file: File;
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
	userId?: string;
}

/**
 * Request payload for EmilEnvironmentData/createEnvironment
 */
export interface ICreateEnvironmentPayload {
	nativeConfig: string;
	driveSettings:  IDriveSetting[];
	templateId: string;
	operatingSystemId: string;
	label: string;
}

export interface IImageImportPayload {
	url: string;
	label: string;
	imageType?: string;
	description?: string;
}

export interface IImageDeletePayload {
	imageArchive: string;
	imageId: string;
}

export interface ISoftwareDeletePayload {
	id: string;
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
	deleted: boolean;
	abstractDataResource: IAbstractDataResource[];
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

export interface IAbstractDataResource {
	dataResourceType: string;
	id: string;
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
	html5: IHTML5UIOption;
	input?: IInputUIOption;
}

export interface IHTML5UIOption {
	pointer_lock: boolean;
	crt: string;
}

export interface IInputUIOption {
	clientKbdLayout: string;
	required: boolean;
}

export interface IOSMetadataResponse {
	operatingSystemInformations: IOSMetadata[];
}

export interface IOSMetadata {
	id: string;
	label: string;
	puids: string[];
	extensions: string[];
}
