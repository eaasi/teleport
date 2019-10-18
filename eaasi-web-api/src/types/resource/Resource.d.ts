import { IEnvironment } from '../emil/EmilEnvironmentData';

export type ResourceType = 'Environment' | 'Software' | 'Content';

export interface IEaasiResource {
	id: number | string;
	title: string;
	resourceType: ResourceType;
}

/*============================================================
 == Save Environment
/============================================================*/

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
