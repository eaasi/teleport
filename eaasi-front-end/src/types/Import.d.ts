import { PhysicalFormat } from './Resource';

export interface ISortable {
	sortIndex: number
}

export type ImportType = 'content' | 'software' | 'environment' | 'bulk';

export type ResourceImportPath = 'Fast' | 'Detailed' | 'Unselected';

export interface IResourceImportFile extends ISortable {
	physicalFormat?: PhysicalFormat,
	fileLabel?: string,
	file: File,
	name: string
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
