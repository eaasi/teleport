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

export interface ISoftwareObject {
	allowedInstances: number;
	archiveId: string;
	exportFMTs: any[];
	importFMTs: any[];
	isOperatingSystem: boolean;
	licenseInformation: string;
	nativeFMTs: string[];
	objectId: string;
	qid: string;
}
