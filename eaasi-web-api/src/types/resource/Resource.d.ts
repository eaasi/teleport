import { IContentItem } from '../emil/EmilContentData';
import { IEnvironment, IImageListItem } from '../emil/EmilEnvironmentData';
import { ISoftwareDescription } from '../emil/EmilSoftwareData';
import { IBookmark } from './Bookmark';

export type PhysicalFormat = 'Q493576' | 'Q495265' | 'disk' | 'Q82753';
export type ResourceType = 'Environment' | 'Software' | 'Content' | 'Image';
//export type ArchiveType = 'public' | 'default' | 'remote' | 'Remote Objects' | 'zero conf';
export type ArchiveType = string;  // can be any arbitrary string!

export interface IEaasiResource {
	id: string;
	title?: string;
	label?: string;
	resourceType: ResourceType;
	archive?: ArchiveType;
	archiveId?: ArchiveType;  // Content can return archiveId key
	isPublic: boolean;
	envId?: string;
}

/*============================================================
 == Save Environment
/============================================================*/

export interface IReplicateEnvironmentRequest {
	destArchive: ArchiveType;
	replicateList: string[];
}

export interface ISaveEnvironmentResponse {
	status: string;
	taskList: string[];
}

export interface ISnapshotRequest {
	// https://openslx.gitlab.io/eaas-api-docs/master/json_SnapshotRequest.html
	envId: string;
	archive?: string;
	message: string;
	author?: string;
	isRelativeMouse?: boolean;
	relativeMouse?: boolean;
	userId: string;
	connectEnvs?: boolean;
	title?: string;
	type?: SnapshotSaveType;
	objectId?: string;
	softwareId?: string;
	networking?: INetworking | any;
}

export interface IEmulatorComponentRequest {
	archive: string;
	emulatorVersion: string;
	environment: string;
	keyboardLayout: string;
	keyboardModel: string;
	type: string;
}

export interface IEmulatorComponentresponse {
	id: string;
	status?: string;
	error?: string;
}

export interface IComponentRequest {
	type: string;
	userId: string;
	connectEnvs: true;
	networking: {
		enableInternet: true;
		serverMode: true;
		localServerMode: true;
		enableSocks: true;
		serverPort: string;
		serverIp: string;
		gwPrivateIp: string;
		gwPrivateMask: string;
		connectEnvs: true;
		helpText: string;
	};
}

export interface IClientEnvironmentRequest {
	componentId: string;
	description: string;
	envId: string;
	title: string;
	networking?: INetworking;
	objectId?: string;
	environment?: IEnvironment;
	softwareId?: string;
	archive?: ArchiveType;
}

export interface IClientSnapshotRequest {
	environmentId: string;
	isRelativeMouse: boolean;
	importSaveDescription: string;
	title: string;
	componentId: string;
}

export interface IRevisionRequest {
	id: string;
	envId?: string;
}

export type SnapshotSaveType = 'newEnvironment' | 'saveImport' | 'objectEnvironment' | 'saveRevision';

export interface INetworking {
	// https://openslx.gitlab.io/eaas-api-docs/master/json_EmilNetworkingType.html
	enableInternet: boolean;
	serverMode: boolean;
	localServerMode: boolean;
	enableSocks: boolean;
	serverPort: string;
	serverIp: string;
	gwPrivateIp: string;
	gwPrivateMask: string;
	connectEnvs: boolean;
	helpText: string;
}

export interface ISnapshotResponse {
	envId: string;
	status: string;
	message: string;
	error?: string;
}

/*============================================================
 == Resource Search
/============================================================*/

export interface IResourceSearchQuery extends IEaasiSearchQuery {
	keyword: string;
	selectedFacets: IResourceSearchFacet[];
	types?: ResourceType[];
	archives?: ArchiveType[];
	onlyBookmarks?: boolean;
	onlyImportedResources?: boolean;
	userId?: number | string;
	forceClearCache?: boolean;
}

export interface IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment>;
	software: IEaasiSearchResponse<ISoftwareDescription>;
	content: IEaasiSearchResponse<IContentItem>;
	images: IEaasiSearchResponse<IImageListItem>;
	facets: IResourceSearchFacet[];
	bookmarks: IBookmark[];
}

export interface IResourceSearchFacet {
	displayLabel: string;
	name: string;
	values: IResourceSearchFacetValue[];
}

export interface IResourceSearchFacetValue {
	resourceType: ResourceType;
	displayLabel?: string;
	label: string;
	total: number;
	isSelected: boolean;
}

/*============================================================
 == General Search
/============================================================*/

export interface IEaasiSearchQuery {
	page: number;
	limit: number;
	keyword?: string;
	sortCol?: string;
	descending: boolean;
	selectedFacets: IResourceSearchFacet[];
}

export interface IEaasiSearchResponse<T> {
	result: T[];
	totalResults: number;
}

export interface IContentRequest {
	archiveName: string;
	contentId: string;
}

export interface IOverrideContentRequest {
	description: string;
	environments: [];
	objectArchive: ArchiveType;
	objectId: string;
}