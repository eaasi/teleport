import { IEaasiSearchQuery } from 'eaasi-http';

declare module 'eaasi-search' {

	export interface IResourceSearchQuery extends IEaasiSearchQuery {
		selectedFacets: IResourceSearchFacet[]
	}

	export interface IResourceSearchFacet {
		name: string
		values: string[]
	}

}