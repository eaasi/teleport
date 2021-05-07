import { ResourceType } from './Resource';

export interface IUserImportRelationRequest {
	resourceId: string;
	resourceType: ResourceType;
}

export interface IUserImportedResource {
	id?: number;
	userId: string;
	eaasiId: string;
}