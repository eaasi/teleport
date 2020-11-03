import { IBookmark } from './Bookmark';
import { IEaasiResource, IEnvironment, IImageListItem, ResourceType } from './Resource';

export type ResourceArchive = 'remote' | 'public' | 'default' | 'zero conf' | 'Remote Objects';

export interface IEaasiSearchResponse<T> {
	result: T[],
	totalResults: number
}

export interface IEaasiSearchQuery {
	page: number;
	limit: number;
	keyword?: string;
	sortCol?: string;
	descending: boolean;
}

/*============================================================
 == Resource Search
/============================================================*/

export interface IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[];
	types: ResourceType[];
	keyword: string;
	archives: ResourceArchive[];
	limit: number;
	page: number;
	userId?: number;
	onlyBookmarks?: boolean;
	onlyImportedResources?: boolean;
}

export interface IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment>;
	software: IEaasiSearchResponse<IEaasiResource>;
	content: IEaasiSearchResponse<IEaasiResource>;
	images: IEaasiSearchResponse<IImageListItem>;
	facets: IResourceSearchFacet[];
	bookmarks?: IBookmark[];
}

export interface IResourceSearchFacet {
	displayLabel: string;
	name: string;
	values: IResourceSearchFacetValue[];
}

export interface IResourceSearchFacetAttribute {
	label: string;
	facetValues: IResourceSearchFacetValue[];
}

export interface IResourceSearchFacetValue {
	label: string;
	total: number;
	isSelected: boolean;
}

export interface ISearchQueryStorage {
	setItem(key: string, value: string): void;
	getItem(key: string): string;
}