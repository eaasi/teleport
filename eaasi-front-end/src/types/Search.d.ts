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

export interface IResourceSearchQuery extends IEaasiSearchQuery {
	selectedFacets: IResourceSearchFacet[];
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