import { ISoftwareImportFile } from '@/types/Import';
import { PhysicalFormat } from '@/types/Resource';

export default class SoftwareImportFile implements ISoftwareImportFile {
	physicalFormat: PhysicalFormat = 'Disk';
	fileLabel?: string;
	file: File;
	sortIndex: number;
	name: string;

	constructor(file: File, sortIndex: number = 0) {
		console.log(file);
		this.file = file;
		this.fileLabel = file.type;
		this.sortIndex = sortIndex;
		this.name = file.name;
	}
}