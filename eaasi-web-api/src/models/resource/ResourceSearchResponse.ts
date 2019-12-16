import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment } from '@/types/emil/EmilEnvironmentData';
import { ISoftwarePackageDescription } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiSearchResponse, IResourceSearchFacet, IResourceSearchResponse } from '@/types/resource/Resource';

export class ResourceSearchResponse implements IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment> = null;
	software: IEaasiSearchResponse<ISoftwarePackageDescription> = null;
	content: IEaasiSearchResponse<IContentItem> = null;
	facets: IResourceSearchFacet[] = [];
	bookmarks: IBookmark[];
}