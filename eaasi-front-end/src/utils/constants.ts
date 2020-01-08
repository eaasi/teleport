import { ImportType } from '@/types/Import';
import { ResourceType } from '@/types/Resource';

export const resourceTypes: IResourceTypes = {
	ENVIRONMENT: 'Environment',
	SOFTWARE: 'Software',
	CONTENT: 'Content'
};

export interface IResourceTypes {
	ENVIRONMENT: ResourceType;
	SOFTWARE: ResourceType;
	CONTENT: ResourceType;
}

export const importTypes: IImportTypes = {
	ENVIRONMENT: 'environment',
	SOFTWARE: 'software',
	CONTENT: 'content',
	BULK: 'bulk'
};

export enum userRoles {
    ADMIN = 1,
    MANAGER = 2,
    CONTRIBUTOR = 3
}
interface IImportTypes {
	ENVIRONMENT: ImportType
	SOFTWARE: ImportType
	CONTENT: ImportType
	BULK: ImportType
}

export const archiveTypes: any = {
	DEFAULT: 'default',
	PUBLIC: 'public',
	REMOTE: 'remote',
};

export const taskTypes: any = {
	IMPORT: 'import',
	DEFAULT: 'default',
	EMIL: 'emil'
};

export const MIN_SEARCH_RESULT_LIMIT = 10;