import { ImportType } from '@/types/Import';
import { IUIOsItem, ResourceType } from '@/types/Resource';
import { KeycloakRole } from '@/types/Keycloak';

const genericMachineIcon = require('../../assets/img/other.png');
const linuxMachineIcon = require('../../assets/img/linux.png');
const appleMachineIcon = require('../../assets/img/apple.png');
const windowsMachineIcon = require('../../assets/img/windows.png');

export const resourceTypes: IResourceTypes = {
	ENVIRONMENT: 'Environment',
	SOFTWARE: 'Software',
	CONTENT: 'Content',
	IMAGE: 'Image'
};

export const resourceLabels: any = {
	CONTENT_ENVIRONMENT: 'Content Environment',
	SOFTWARE_ENVIRONMENT: 'Software Environment',
	ENVIRONMENT: 'Environment',
	SOFTWARE: 'Software Object',
	OPERATING_SYSTEM: 'Operating System',
	CONTENT: 'Content Object',
	IMAGE: 'Image'
};

export interface IResourceTypes {
	ENVIRONMENT: ResourceType;
	SOFTWARE: ResourceType;
	CONTENT: ResourceType;
	IMAGE: ResourceType;
}

export const importTypes: IImportTypes = {
	ENVIRONMENT: 'environment',
	SOFTWARE: 'software',
	CONTENT: 'content',
	IMAGE: 'image',
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
	IMAGE: ImportType;
}

export const archiveTypes: any = {
	DEFAULT: 'default',
	PUBLIC: 'public',
	REMOTE: 'remote',
};

export const taskTypes: any = {
	IMPORT: 'import',
	DEFAULT: 'default',
	EMIL: 'emil',
	IMPORT_EMULATOR: 'import_emulator'
};

export const MIN_SEARCH_RESULT_LIMIT = 10;

export const defaultOsList: IUIOsItem[] = [
	{ icon: windowsMachineIcon, title: 'Windows', value: 'windows' },
	{ icon: linuxMachineIcon, title: 'Linux', value: 'linux' },
	{ icon: appleMachineIcon, title: 'Apple', value: 'mac' },
	{ icon: genericMachineIcon, title: 'Other', value: 'other' }
];

export function translatedIcon(name: string): string {
	switch (name) {
		case 'paperclip':
			return '';
		case 'bookmark':
			return '';
		case 'file-container':
			return '';
		case 'home':
			return '';
		case 'trash':
			return '';
		case 'file':
			return '';
		case 'atom':
			return '';
		case 'config-environment':
			return '';
		case 'file-search':
			return '';
		case 'upload':
			return '';
		case 'lock':
			return '';
		case 'clipboard-list':
			return '';
		case 'manage':
			return '';
		case 'cloud-upload':
			return '';
		case 'public-network':
			return '';
		case 'power':
			return '';
		case 'map-marker':
			return '';
		case 'cloud-download':
			return '';
		case 'disk':
			return '';
		case 'unlock':
			return '';
		default:
			return 'X';
	}
}

export const ROLES_MAPPER = {
	[KeycloakRole.EaasUser]: userRoles.CONTRIBUTOR,
	[KeycloakRole.EaasAdmin]: userRoles.ADMIN,
	[KeycloakRole.EaasManager]: userRoles.MANAGER
};

export const EDITION_TYPES = {
	STANDALONE: 'standalone',
	MULTI_TENANT: 'multi-tenant'
};

export const ENVIRONMENT_TYPES = {
	BASE: 'base',
	OBJECT: 'object'
};

export const ACTION_TYPE = {
	EDIT: 'Edit',
	ADD: 'Add'
};

export const AVAILABLE_RESOURCES_BY_DISK_TYPE = {
	disk: [resourceTypes.IMAGE],
	floppy: [resourceTypes.SOFTWARE, resourceTypes.CONTENT],
	cdrom: [resourceTypes.SOFTWARE, resourceTypes.CONTENT],
};