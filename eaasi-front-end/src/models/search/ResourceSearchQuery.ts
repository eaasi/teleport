import { IResourceSearchQuery, IResourceSearchFacet } from '@/types/Search';

export default class ResourceSearchQuery implements IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[];
	page: number = 1;
	limit: number = 25;
	keyword?: string = '';
	sortCol?: string = '';
	descending: boolean = false;
}