import { IResourceSearchResponse, IResourceSearchFacet, IEaasiSearchResponse, IEaasiResource } from '@/types/resource/Resource';
import { IEnvironment } from '@/types/emil/EmilEnvironmentData';

export class ResourceSearchResponse implements IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment> = null;
	software: IEaasiSearchResponse<IEaasiResource> = null;
	content: IEaasiSearchResponse<IEaasiResource> = null;
	facets: IResourceSearchFacet[] = [];
}