import { ResourceType } from '@/types/Resource';
import { IResourceSearchFacet, IResourceSearchQuery, ResourceArchive } from '@/types/Search';
import { MIN_SEARCH_RESULT_LIMIT } from '@/utils/constants';

export default class ResourceSearchQuery implements IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[] = [];
	archives: ResourceArchive[] = [];
	types: ResourceType[];
	keyword: string = null;
	limit: number = MIN_SEARCH_RESULT_LIMIT;
	page: number = 1;
	userId?: number;
}