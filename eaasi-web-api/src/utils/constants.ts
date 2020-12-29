import { ArchiveType, ResourceType } from '../types/resource/Resource';

export const resourceTypes: IResourceTypes = {
	ENVIRONMENT: 'Environment',
	SOFTWARE: 'Software',
	CONTENT: 'Content',
	IMAGE: 'Image'
};

export const archiveTypes: IArchiveTypes = {
	DEFAULT: 'default',
	PUBLIC: 'public',
	REMOTE: 'remote',
};

export const objectArchiveTypes: IObjectArchiveTypes = {
	REMOTE: 'Remote Objects',
	LOCAL: 'zero conf'
}

export enum userRoles {
	ADMIN = 1,
	MANAGER = 2,
	CONTRIBUTOR = 3
}

interface IArchiveTypes {
	DEFAULT: ArchiveType;
	PUBLIC: ArchiveType;
	REMOTE: ArchiveType;
}

interface IObjectArchiveTypes {
	REMOTE: ArchiveType;
	LOCAL: ArchiveType;
}

interface IResourceTypes {
	ENVIRONMENT: ResourceType;
	SOFTWARE: ResourceType;
	CONTENT: ResourceType;
	IMAGE: ResourceType;
}

export const taskStatus = {
	SUCCESS: '0',
	NOT_FOUND: '1'
}

export const TaskType: ITaskType = {
	RESOURCE_IMPORT: 'resource-import',
}

export interface ITaskType {
	RESOURCE_IMPORT: string;
}
