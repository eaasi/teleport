import { IContentItem } from '@/types/emil/EmilContentData';
import { IEnvironment, IImageListItem } from '@/types/emil/EmilEnvironmentData';
import { ISoftwareDescription } from '@/types/emil/EmilSoftwareData';
import { IBookmark } from '@/types/resource/Bookmark';
import { IEaasiSearchResponse, IResourceSearchFacet, IResourceSearchResponse } from '@/types/resource/Resource';

export class ResourceSearchResponse implements IResourceSearchResponse {
	environments: IEaasiSearchResponse<IEnvironment> = null;
	software: IEaasiSearchResponse<ISoftwareDescription> = null;
	content: IEaasiSearchResponse<IContentItem> = null;
	facets: IResourceSearchFacet[] = [];
	images: IEaasiSearchResponse<IImageListItem> = null;
	bookmarks: IBookmark[];
}