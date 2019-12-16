import {IOsListItem} from '@/models/admin/OperatingSystems';
import SoftwareImportResource from './SoftwareImportResource';

export default class EnvironmentImportResource extends SoftwareImportResource {
	software: SoftwareImportResource = new SoftwareImportResource();
	type: number = 1;
	diskSize: string;
	nativeFMTs: IOsListItem[];
}