import { IResourceSearchQuery, IResourceSearchFacet } from '@/types/Search';
import { ResourceType } from '@/types/Resource';

export default class ResourceSearchQuery implements IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[] = [];
	types: ResourceType[];
	keyword: string = null;
}