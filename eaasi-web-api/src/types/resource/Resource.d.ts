import { IContentItem } from '../emil/EmilContentData';
import { IEnvironment } from '../emil/EmilEnvironmentData';
import { ISoftwarePackageDescription } from '../emil/EmilSoftwareData';
import { IBookmark } from './Bookmark';

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

export interface IReplicateEnvironmentRequest {
	destArchive: ArchiveType;
	replicateList: string[];
}

export interface ISaveEnvironmentResponse {
	status: string;
	taskList: string[];
}

/*============================================================
 == Resource Search
/============================================================*/

export interface IResourceSearchQuery extends IEaasiSearchQuery {
	selectedFacets: IResourceSearchFacet[];
	types: ResourceType[];
	archives: ArchiveType[];
	keyword: string;
	userId: number;
	onlyBookmarks: boolean;
}

export interface IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment>;
	software: IEaasiSearchResponse<ISoftwarePackageDescription>;
	content: IEaasiSearchResponse<IContentItem>;
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
	objectArchive: string;
	objectId: string;
}
