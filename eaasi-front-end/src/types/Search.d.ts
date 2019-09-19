import { IEaasiSearchQuery } from 'eaasi-http';


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