import { ResourceType } from '@/types/resource/Resource';

export interface IUserImportRelationRequest {
	userId: string;
	resourceId: string;
	resourceType: ResourceType;
}

export interface IUserImportedResource {
	id?: number;
	userId: string;
	eaasiId: string;
}