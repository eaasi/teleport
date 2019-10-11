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