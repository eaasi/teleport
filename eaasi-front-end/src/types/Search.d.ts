import { ResourceType, IEnvironment, IEaasiResource } from './Resource';

export type ResourceArchive = 'remote' | 'public' | 'default';

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
}

export interface IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment>;
	software: IEaasiSearchResponse<IEaasiResource>;
	content: IEaasiSearchResponse<IEaasiResource>;
	facets: IResourceSearchFacet[];
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