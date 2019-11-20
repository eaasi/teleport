import { IResourceSearchQuery, IResourceSearchFacet, ResourceArchive } from '@/types/Search';
import { ResourceType } from '@/types/Resource';

export default class ResourceSearchQuery implements IResourceSearchQuery {
	selectedFacets: IResourceSearchFacet[] = [];
	archives: ResourceArchive[] = [];
	types: ResourceType[];
	keyword: string = null;
	limit: number = 10;
}