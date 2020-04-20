import { ResourceType } from './Resource';

export interface IUserImportRelationRequest {
	userId: number;
	resourceId: string;
	resourceType: ResourceType;
}

export interface IUserImportedResource {
	id?: number;
	userID: number;
	eaasiID: string;
}