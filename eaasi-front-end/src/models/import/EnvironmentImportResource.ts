import { IOsListItem } from '@/models/admin/OperatingSystems';
import { IDrive } from '@/types/Resource';
import SoftwareImportResource from './SoftwareImportResource';

export default class EnvironmentImportResource extends SoftwareImportResource {
	software: SoftwareImportResource = new SoftwareImportResource();
	type: number = 1;
	diskSize: string;
	nativeFMTs: IOsListItem[];
	label = '';
	size = 1024;
	cpus = '1';
	enablePrinting = false;
	enableRelativeMouse = false;
	virtualizeCpu = false;
	useWebRTC = false;
	useXpra = false;
	xpraEncoding = '';
	shutdownByOs = false;
	drives: IDrive[] = [];
}