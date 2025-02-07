import { IImportObjectRequest } from '@/types/emil/Emil';
import { IContentItem, IObjectArchiveResonse } from '@/types/emil/EmilContentData';
import { ArchiveType, IContentRequest } from '@/types/resource/Resource';
import { IEmilTask } from '@/types/task/Task';
import { objectArchiveTypes, resourceTypes } from '@/utils/constants';
import BaseService from '../base/BaseService';
import EmilBaseService from '../base/EmilBaseService';
import {getUserIdFromToken} from '../../utils/token'

export default class ContentService extends BaseService {

	private readonly _contentRepoService: EmilBaseService;
	private readonly CACHE_KEYS = {
		ITEMS: 'content-items',
		ARCHIVES: 'content-archives'
	};

	constructor(
		contentRepository: EmilBaseService = new EmilBaseService('object-repository')
	) {
		super();
		this._contentRepoService = contentRepository;
	}

	async getAll(archiveId: ArchiveType, token?: string): Promise<IContentItem[]> {
		const cacheKey = `${this.CACHE_KEYS.ITEMS}/${archiveId}`;
		let results = this._cache.get<IContentItem[]>(cacheKey);
		if(results) return results;
		let res = await this._contentRepoService.get(`archives/${archiveId}/objects`, token);
		let content = await res.json() as IContentItem[];
		content.forEach((x: IContentItem) => {
			x.resourceType = resourceTypes.CONTENT
			if (x.hasOwnProperty('title') && !x.hasOwnProperty('label')) x.label = x.title;
		});
		if (content.length) this._cache.add(cacheKey, content);
		return content;
	}

	async getObjectMetadata(contentRequest: IContentRequest, token?: string): Promise<IContentItem> {
		let res = await this._contentRepoService.get(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`, token);
		let content = await res.json() as IContentItem;
		content.resourceType = resourceTypes.CONTENT;
		return content;
	}

	private async fetchObjectArchives(token?: string): Promise<IObjectArchiveResonse> {
		const res = await this._contentRepoService.get('archives', token);
		return await res.json();
	}

	async getObjectArchives(token?: string): Promise<IObjectArchiveResonse> {
		const userId = getUserIdFromToken(token);
		const cacheKey = `${this.CACHE_KEYS.ARCHIVES}/${userId}`;
		let result = this._cache.get<IObjectArchiveResonse>(cacheKey);
		if (result)
			return result;

		result = await this.fetchObjectArchives(token);
		if (result.archives?.length)
			this._cache.add(cacheKey, result);

		return result;
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
		if (res.ok) this.clearCache(token);
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
		const res = await this._contentRepoService.post(`archives/${archiveId}/objects`, importPayload, token);
		if (res.ok) this.clearCache(token);
		return await res.json() as IEmilTask;
	}

	/*============================================================
	 == Cache
	/============================================================*/

	private async clearCache(token: string) {
		const userId = getUserIdFromToken(token);
		const cacheKeyForArchives = `${this.CACHE_KEYS.ARCHIVES}/${userId}`;
		let cachedArchiveResponse = this._cache.get<IObjectArchiveResonse>(cacheKeyForArchives);
		if (!cachedArchiveResponse)
			cachedArchiveResponse = await this.fetchObjectArchives(token);

		this._cache.delete(cacheKeyForArchives);
		cachedArchiveResponse.archives.forEach(archiveId => {
			this._cache.delete(`${this.CACHE_KEYS.ITEMS}/${archiveId}`)
		});
	}


}
