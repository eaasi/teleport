import { IImportObjectRequest } from '@/types/emil/Emil';
import { IContentItem, IObjectArchiveResonse } from '@/types/emil/EmilContentData';
import { ArchiveType, IContentRequest } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { objectArchiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';

export default class ContentService extends BaseService {

	private readonly _contentRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ALL_CONTENT: 'all-content-items',
		ARCHIVES: 'content-archives'
	};

	constructor(
		contentRepository: EmilBaseService = new EmilBaseService('object-repository')
	) {
		super();
		this._contentRepoService = contentRepository;
	}

	async getAll(archiveId: ArchiveType, token?: string): Promise<IContentItem[]> {
		let results = this._cache.get<IContentItem[]>(this.CACHE_KEYS.ALL_CONTENT)
		if(results) return results;
		let res = await this._contentRepoService.get(`archives/${archiveId}/objects`, token);
		let content = await res.json() as IContentItem[];
		content.forEach((x: IContentItem) => {
			x.resourceType = resourceTypes.CONTENT
			if (x.hasOwnProperty('title') && !x.hasOwnProperty('label')) x.label = x.title;
		});
		if (content.length) this._cache.add(this.CACHE_KEYS.ALL_CONTENT, content);
		return content;
	}

	async getObjectMetadata(contentRequest: IContentRequest, token?: string): Promise<IContentItem> {
		let res = await this._contentRepoService.get(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`, token);
		let content = await res.json() as IContentItem;
		content.resourceType = resourceTypes.CONTENT;
		return content;
	}

	async getObjectArchives(token?: string): Promise<IObjectArchiveResonse> {
		let result = this._cache.get<IObjectArchiveResonse>(this.CACHE_KEYS.ARCHIVES)
		if(result) return result;
		let res = await this._contentRepoService.get('archives', token);
		let archives = await res.json();
		if (archives.length) this._cache.add(this.CACHE_KEYS.ARCHIVES, archives);
		return archives;
	}

	/**
	 * Deletes content using provided IContentRequest
	 * @param contentRequest: {
	 *   archiveName: string;
	 *   contentId: string;
	 * }
	 */
	async deleteContent(contentRequest: IContentRequest, token?: string) {
		let res = await this._contentRepoService.delete(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`, null, token);
		if (!res) return null;
		if (res.ok) this.clearCache();
		let reusableResponse = res.clone();
		try {
			return await res.json();
		} catch (e) {
			this._logger.log.warn(
				`Received malformed JSON from server: ${e.message}. Parsing response explicitly.`);
			return reusableResponse.text().then((text: string) => {
				return text ? JSON.parse(text) : {}
			});
		}
	}

	async importObject(importPayload: IImportObjectRequest, archiveId = objectArchiveTypes.LOCAL, token?: string): Promise<IEmilTask> {
		const res = await this._contentRepoService.post(`/archives/${archiveId}/objects`, importPayload, token);
		if (res.ok) this.clearCache();
		return await res.json() as IEmilTask;
	}

	/*============================================================
	 == Cache
	/============================================================*/

	private clearCache() {
		Object.values(this.CACHE_KEYS).forEach(key => {
			this._cache.delete(key);
		});
	}


}
