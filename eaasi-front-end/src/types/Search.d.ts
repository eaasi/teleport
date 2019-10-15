import { ResourceType, IEnvironment, IEaasiResource } from './Resource';

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

export interface IResourceSearchFacetAttribute {
	label: string;
	facetValues: IResourceSearchFacetValue[];
}

export interface IResourceSearchFacetValue {
	label: string;
	total: number;
	isSelected: boolean;
}