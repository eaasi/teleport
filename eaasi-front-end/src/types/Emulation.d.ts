import { ResourceType } from './Resource';

export interface IEmulationProject {
	id: number;
	userId: string;
	resources: IEmulationProjectResource[]
}

export interface IEmulationProjectResource {
	id: number;
	emulationProjectId: number;
	archiveId: string;
	resourceId: string;
	resourceType: ResourceType
}

export interface IEmulatorComponentRequest {
	archive: string;
	emulatorVersion: string;
	environment: string;
	keyboardLayout: string;
	keyboardModel: string;
	software?: string;
	objectArchive?: string;
	type: string;
}
