import { IImportObjectRequest } from '@/types/emil/Emil';
import { IContentItem, IObjectArchiveResonse } from '@/types/emil/EmilContentData';
import { ArchiveType, IContentRequest } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { objectArchiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import CacheHelper from '@/helpers/CacheHelper';

export default class ContentService extends BaseService {

	private readonly _contentRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ALL_CONTENT: 'all-content-items',
		ARCHIVES: 'content-archives'
	}

	constructor(
		contentRepository: EmilBaseService = new EmilBaseService('object-repository'),
	) {
		super();
		this._contentRepoService = contentRepository;
	}

	async getAll(archiveId: ArchiveType): Promise<IContentItem[]> {
		let results = CacheHelper.get<IContentItem[]>(this.CACHE_KEYS.ALL_CONTENT)
		if(results) return results;
		let res = await this._contentRepoService.get(`archives/${archiveId}/objects`);
		let content = await res.json() as IContentItem[];
		content.forEach(x => x.resourceType = resourceTypes.CONTENT);
		CacheHelper.add(this.CACHE_KEYS.ALL_CONTENT, content);
		return content;
	}

	async getObjectMetadata(contentRequest: IContentRequest): Promise<IContentItem> {
		let res = await this._contentRepoService.get(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`);
		let content = await res.json() as IContentItem;
		content.resourceType = resourceTypes.CONTENT;
		return content;
	}

	async getObjectArchives(): Promise<IObjectArchiveResonse> {
		let result = CacheHelper.get<IObjectArchiveResonse>(this.CACHE_KEYS.ARCHIVES)
		if(result) return result;
		let res = await this._contentRepoService.get('archives');
		let archives = await res.json();
		CacheHelper.add(this.CACHE_KEYS.ARCHIVES, archives);
		return archives;
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
		if(res.ok) this.clearCache();
		return await res.json();
	}

	async importObject(importPayload: IImportObjectRequest, archiveId = objectArchiveTypes.LOCAL): Promise<IEmilTask> {
		const res = await this._contentRepoService.post(`/archives/${archiveId}/objects`, importPayload);
		if(res.ok) this.clearCache();
		return await res.json() as IEmilTask;
	}

	/*============================================================
	 == Cache
	/============================================================*/

	private clearCache() {
		Object.values(this.CACHE_KEYS).forEach(key => {
			CacheHelper.delete(key);
		});
	}


}
