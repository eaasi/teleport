import { IEaasiResource } from '../resource/Resource';

export interface ISoftwarePackageDescriptionsList {
	descriptions: ISoftwarePackageDescription[];
	status: number | string;
}

export interface ISoftwarePackageDescription extends IEaasiResource {
	id: string;
	isOperatingSystem: boolean;
	label: string;
}