import { ArchiveType, IEaasiResource } from '../resource/Resource';

export interface ISoftwareDescriptionList {
	descriptions: ISoftwareDescription[];
	status: number | string;
}

export interface ISoftwarePackage extends IEaasiResource {
	id: string;
	isOperatingSystem: boolean;
	label: string;
}

export interface ISoftwareObject extends IEaasiResource {
	allowedInstances: number;
	archiveId: ArchiveType;
	exportFMTs: any[];
	importFMTs: any[];
	isOperatingSystem: boolean;
	licenseInformation: string;
	nativeFMTs: string[];
	objectId: string;
	qid: string;
}

export interface ISoftwareDescription extends IEaasiResource {
	label: string;
	isPublic: boolean;
	isOperatingSystem: boolean;
}
