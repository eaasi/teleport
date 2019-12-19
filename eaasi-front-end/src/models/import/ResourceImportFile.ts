import { IResourceImportFile } from '@/types/Import';
import { PhysicalFormat } from '@/types/Resource';

export default class ResourceImportFile implements IResourceImportFile {
	physicalFormat: PhysicalFormat = 'Q82753';
	fileLabel?: string;
	file: File;
	sortIndex: number;
	name: string;

	constructor(file: File, sortIndex: number = 0) {
		this.file = file;
		this.fileLabel = file.name;
		this.sortIndex = sortIndex;
		this.name = file.name;
	}
}