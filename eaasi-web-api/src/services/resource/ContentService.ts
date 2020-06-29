import { IImportObjectRequest } from '@/types/emil/Emil';
import { IContentItem, IObjectArchiveResonse } from '@/types/emil/EmilContentData';
import { ArchiveType, IContentRequest } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { objectArchiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import { getFromCache, addToCache } from '@/utils/cache.utility';

export default class ContentService extends BaseService {

	private readonly _contentRepoService: EmilBaseService;

	constructor(
		contentRepository: EmilBaseService = new EmilBaseService('object-repository'),
	) {
		super();
		this._contentRepoService = contentRepository;
	}

	async getAll(archiveId: ArchiveType, bypassCache: boolean = false): Promise<IContentItem[]> {
		const CACHE_KEY = 'all-content-items';
		if(!bypassCache) {
			let results = getFromCache<IContentItem[]>(CACHE_KEY)
			if(results) return results;
		}
		let res = await this._contentRepoService.get(`archives/${archiveId}/objects`);
		let content = await res.json() as IContentItem[];
		content.forEach(x => x.resourceType = resourceTypes.CONTENT);
		addToCache(CACHE_KEY, content);
		return content;
	}

	private mapContentItems(items: IContentItem[]): Promise<IContentItem[]> {
		return Promise.all(items.map(item => {
			return this.getObjectMetadata({
				contentId: item.id,
				archiveName: item.archiveId
			});
		}))
	}


	async getObjectMetadata(contentRequest: IContentRequest): Promise<IContentItem> {
		let res = await this._contentRepoService.get(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`);
		let content = await res.json() as IContentItem;
		content.resourceType = resourceTypes.CONTENT;
		return content;
	}

	async getObjectArchives(): Promise<IObjectArchiveResonse> {
		let res = await this._contentRepoService.get('archives');
		return res.json();
	}

	/**
	 * Deletes content using provided IContentRequest
	 * @param contentRequest: {
	 *   archiveName: string;
	 *   contentId: string;
	 * }
	 */
	async deleteContent(contentRequest: IContentRequest) {
		let res = await this._contentRepoService.delete(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`);
		if (!res) return null;
		return await res.json();
	}

	async importObject(importPayload: IImportObjectRequest, archiveId = objectArchiveTypes.LOCAL): Promise<IEmilTask> {
		const res = await this._contentRepoService.post(`/archives/${archiveId}/objects`, importPayload);
		return await res.json() as IEmilTask;
	}


}
