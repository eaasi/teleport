import { PhysicalFormat } from './Resource';

export interface ISortable {
	sortIndex: number
}

export type ImportType = 'file' | 'software' | 'environment' | 'bulk';

export type ResourceImportPath = 'Fast' | 'Detailed' | 'Unselected';

export interface ISoftwareImportFile extends ISortable {
	physicalFormat?: PhysicalFormat,
	fileLabel?: string,
	file: File,
	name: string
}