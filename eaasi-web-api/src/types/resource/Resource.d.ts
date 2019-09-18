export interface IResourceSearchQuery extends IEaasiSearchQuery {
	selectedFacets: IResourceSearchFacet[];
}

export interface IResourceSearchFacet {
	name: string;
	values: string[];
}

export interface IEaasiResource {
	id: number | string;
	title: string;
	resourceType: ResourceType;
}

export type ResourceType = 'Environment' | 'Software' | 'Content';

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