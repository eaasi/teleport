import { ResourceType } from "../resource/Resource";

export interface IEmulationProject {
	id: number;
	userId: string;
	resources: IEmulationProjectResource[];
}

export interface IEmulationProjectResource {
	id: number;
	emulationProjectId: number;
	resourceId: string;
	resourceType: ResourceType;
}

export interface IEmulatorComponentRequest {
	archive: string;
	emulatorVersion: string;
	environment: string;
	keyboardLayout: string;
	keyboardModel: string;
	type: string;
}

export interface ITempEnvironmentRecord {
	id?: number;
	userId: string;
	envId: string;
}