import { ResourceType } from '@/types/resource/Resource';

export const resourceTypes: IResourceTypes = {
	ENVIRONMENT: 'Environment',
	SOFTWARE: 'Software',
	CONTENT: 'Content'
};

export enum userRoles {
	ADMIN = 1,
	MANAGER = 2,
	CONTRIBUTOR = 3
}

interface IResourceTypes {
	ENVIRONMENT: ResourceType;
	SOFTWARE: ResourceType;
	CONTENT: ResourceType;
}
