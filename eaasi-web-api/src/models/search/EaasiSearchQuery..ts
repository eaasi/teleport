import { IEaasiSearchQuery, IResourceSearchFacet } from '@/types/resource/Resource';

export class EaasiSearchQuery implements IEaasiSearchQuery {
	page: number;
	limit: number;
	keyword: string;
	sortCol: string = null;
	descending: boolean = false;
	selectedFacets: IResourceSearchFacet[];

	constructor(keyword: string = null, limit: number = 25, page = 1, selectedFacets = []) {
		this.keyword = keyword;
		this.limit = limit;
		this.page = page;
		this.selectedFacets = selectedFacets;
	}
}