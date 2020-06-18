import { ResourceType } from "./Resource";

export interface IEmulationProject {
	id: number;
	userId: number;
	resources: IEmulationProjectResource[]
}

export interface IEmulationProjectResource {
	id: number;
	emulationProjectId: number;
	resourceId: number;
	resourceType: ResourceType
}