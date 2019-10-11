import SoftwareImportResource from './SoftwareImportResource';

export default class EnvironmentImportResource extends SoftwareImportResource {
	software: SoftwareImportResource = new SoftwareImportResource();
	type: number = 1;
}