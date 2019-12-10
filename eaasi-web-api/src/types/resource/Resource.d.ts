import { IEnvironment } from '../emil/EmilEnvironmentData';

export type ResourceType = 'Environment' | 'Software' | 'Content';
export type ArchiveType = 'public' | 'default' | 'remote';

export interface IEaasiResource {
	id: number | string;
	title: string;
	resourceType: ResourceType;
	archive: ArchiveType;
	archiveId?: ArchiveType;  // Content can return archiveId key
}

/*============================================================
 == Save Environment
/============================================================*/

export interface ISaveEnvironmentResponse {
	status: string;
	taskList: string[];
}

export type IReplicateImageRequest = {
    destArchive: Archive;
    replicateList: Array<string>;
}

type Archive = 'remote' | 'public' | 'private';

/*============================================================
 == Resource Search
/============================================================*/

export interface IResourceSearchQuery extends IEaasiSearchQuery {
	selectedFacets: IResourceSearchFacet[];
	types: ResourceType[];
	archives: ArchiveType[];
	keyword: string;
}

export interface IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment>;
	software: IEaasiSearchResponse<IEaasiResource>;
	content: IEaasiSearchResponse<IEaasiResource>;
	facets: IResourceSearchFacet[];
}

export interface IResourceSearchFacet {
	name: string;
	values: IResourceSearchFacetValue[];
}

export interface IResourceSearchFacetValue {
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
	objectArchive: string;
	objectId: string;
}
