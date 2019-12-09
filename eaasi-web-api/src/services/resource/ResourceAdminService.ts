import {ResourceSearchResponse} from '@/models/resource/ResourceSearchResponse';
import SaveEnvironmentRequest from '@/models/resource/SaveEnvironmentRequest';
import {EaasiSearchQuery} from '@/models/search/EaasiSearchQuery.';
import {IContentItem} from '@/types/emil/EmilContentData';
import {IEnvironment} from '@/types/emil/EmilEnvironmentData';
import {ISoftwarePackageDescription, ISoftwarePackageDescriptionsList, ISoftwareObject} from '@/types/emil/EmilSoftwareData';
import {
	IEaasiResource,
	IEaasiSearchQuery,
	IEaasiSearchResponse,
	IResourceSearchQuery,
	IResourceSearchResponse, ISaveEnvironmentResponse, IReplicateImageRequest, IContentRequest, IOverrideContentRequest
} from '@/types/resource/Resource';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';
import IHttpService from '@/services/interfaces/IHttpService';
import { resourceTypes } from '@/utils/constants';
import HttpJSONService from '../base/HttpJSONService';

const BASE_URL = process.env.EAAS_JAVA_SERVICE_URL;

export default class ResourceAdminService extends BaseService {

	private readonly _emilEnvSvc: EmilBaseService;
	private readonly _emilSofSvc: EmilBaseService;
	private readonly _emilContentSvc: EmilBaseService;
	private readonly _emilClassificationService: EmilBaseService;

	constructor(
		emilEnvService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
		emilSofService: EmilBaseService = new EmilBaseService('EmilSoftwareData'),
		emilContentService: EmilBaseService = new EmilBaseService('objects'),
		emilClassificationService: EmilBaseService = new EmilBaseService('classification'),
	) {
		super();
		this._emilEnvSvc = emilEnvService;
		this._emilSofSvc = emilSofService;
		this._emilContentSvc = emilContentService;
		this._emilClassificationService = emilClassificationService;
	}

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 */
	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		// TODO: Refactor

		let q = new EaasiSearchQuery(query.keyword, query.limit);
		let result = new ResourceSearchResponse();

		let envReq;
		let sofReq;
		let conReq;

		if (query.types && query.types.length > 0) {
			// Search specific types
			query.types.forEach(t => {
				if (t === resourceTypes.ENVIRONMENT) envReq = this._searchEnvironments(q);
				else if (t === resourceTypes.SOFTWARE) sofReq = this._searchSoftware(q);
				else if (t === resourceTypes.CONTENT) conReq = this._searchContent(q);
			});
		} else {
			// Search all types
			envReq = this._searchEnvironments(q);
			sofReq = this._searchSoftware(q);
			conReq = this._searchContent(q);
		}

		result.environments = envReq ? await envReq : { result: [], totalResults: 0 };
		result.software = sofReq ? await sofReq : { result: [], totalResults: 0 };
		result.content = conReq ? await conReq : { result: [], totalResults: 0 };

		if (query.archives && query.archives.length > 0) {
			result.environments.result = result.environments.result.filter(env => query.archives.includes(env.archive));
			result.software.result = result.software.result.filter(sw => query.archives.includes(sw.archive));
			result.content.result = result.content.result.filter(content => query.archives.includes(content.archive));

		}

		result.environments.result.forEach(env => env.resourceType = resourceTypes.ENVIRONMENT);
		result.software.result.forEach(s => s.resourceType = resourceTypes.SOFTWARE);
		result.content.result.forEach(c => c.resourceType = resourceTypes.CONTENT);

		return result;
	}

	/*============================================================
	 == Environments
	/============================================================*/

	/**
	 * Gets an Environment by ID
	 * @param id: string environmentId
	 */
	async getEnvironment(id: string): Promise<IEnvironment> {
		let res = await this._emilEnvSvc.get(id);
		return await res.json() as IEnvironment;
	}

	/**
	 * Save / Replicate an Environment to local storage
	 * @param id: environmentId
	 */
	async saveEnvironment(id: string): Promise<ISaveEnvironmentResponse | null> {
	    // The endpoint currently takes a POST request payload containing a list of ids and a source destination.
		// 'public' source destination makes the environment available locally to the requesting Node.
		// TODO: Handle error responses from Emil API -- there are several cases to handle
		// TODO: See https://gitlab.com/eaasi/eaas-server/blob/eaasi-release-2019.07/src/emil/src/main/java/de/bwl/bwfla/emil/EmilEnvironmentData.java#L772

		let saveEnvironmentRequest = new SaveEnvironmentRequest([id], 'public').toJson();
		let response = await this._emilEnvSvc.post('replicateImage', saveEnvironmentRequest)
		return response.json()
	}

	/**
	 * Delete an Environment from local storage
	 * @param id: environmentId
	 */
	async deleteEnvironment(id: string) {
		let environmentToDelete = {
			'envId': id,
			'deleteMetaData': true,
			'deleteImage': true,
			'force': true
		};
		let res = await this._emilEnvSvc.post('delete', environmentToDelete);
		return await res.json();
	}

	/**
	 * Replicates a list of images to the requested archive
	 * @param {
	 *   destArchive: 'remote' | 'public' | 'private';
	 *   replicateList: Array<string>;
	 * }: IReplicateImageRequest
	 */
	async replicateImage(replicateRequest: IReplicateImageRequest) {
		let res = await this._emilEnvSvc.post('replicateImage', replicateRequest);
		return await res.json();
	}

	/**
	 * Searches  for all environments using the provided IEaasiSearchQuery
	 * @param query
	 * @private
	 */
	private async _searchEnvironments(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<IEnvironment>> {
		let res = await this._emilEnvSvc.get('');
		let list = await res.json() as IEnvironment[];
		return this._filterResults<IEnvironment>(query, list);
	}

	/*============================================================
	 == Software
	/============================================================*/
	/**
	 * Saves software object
	 * @param softwareObject: ISoftwareObject with req.body
	 */
	async saveSoftwareObject(softwareObject: ISoftwareObject) {
		let res = await this._emilSofSvc.post('saveSoftwareObject', softwareObject);
		return await res.json();
	}

	/**
	 * Gets a Software Object by ID
	 * @param id: string softwareId
	 */
	async getSoftwareObject(id: string): Promise<any> {
		let res = await this._emilSofSvc.get(`getSoftwareObject?softwareId=${id}`);
		return await res.json();
	}


	/**
	 * Posts Object Import Request data
	 * @param req : Request with req.body
	 */
	async getSoftwareMetadata(archiveId: string, objectId: string) {
		let httpSvc: IHttpService = new HttpJSONService();
		let url = `${BASE_URL}/emil/objects/${archiveId}/${objectId}`;
		let res = await httpSvc.get(url);
		return await res.json();
	}

	/**
	 * Gets a description of a software package by id
	 * @param id: string softwareId
	 */
	async getSoftwarePackageDescription(id: string): Promise<IEnvironment> {
		let res = await this._emilSofSvc.get(`getSoftwarePackageDescription?softwareId=${id}`);
		return await res.json();
	}

	/**
	 * Searches for all software using the provided IEaasiSearchQuery
	 * @param query: IEaasiSearchQuery
	 * @private
	 */
	private async _searchSoftware(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<ISoftwarePackageDescription>> {
		let res = await this._emilSofSvc.get('getSoftwarePackageDescriptions');
		let list = await res.json() as ISoftwarePackageDescriptionsList;
		let software = list.descriptions;
		// TODO: we need to ensure all responses adhere to IEaasiResource
		software.forEach(x => x.title = x.label);
		return this._filterResults<ISoftwarePackageDescription>(query, software);
	}

	/*============================================================
	 == Content
	/============================================================*/

	/**
	 * Searches for all content using the provided IEaasiSearchQuery
	 * @param query: IEaasiSearchQuery
	 * @private
	 */
	private async _searchContent(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<IEaasiResource>> {
		// TODO: do not hard code 'zero conf'
		let res = await this._emilContentSvc.get('zero%20conf');
		let contentItems = await res.json() as IContentItem[];
		return this._filterResults<IContentItem>(query, contentItems);
	}

	async getObjectArchive() {
		let res = await this._emilContentSvc.get('archives');
		return res.json();
	}

	async getObjectArchiveItems(archiveId: string) {
		let res = await this._emilContentSvc.get(archiveId);
		return res.json();
	}

	async getContentMetadata(contentRequest: IContentRequest) {
		let res = await this._emilContentSvc.get(`${contentRequest.archiveName}/${contentRequest.contentId}`);
		return res.json();
	}

	async saveContent(contentOverride: IOverrideContentRequest) {
		let res = await this._emilClassificationService.post('overrideObjectCharacterization', contentOverride);
		return res.json();
	}

	/*============================================================
	 == Revisions
	/============================================================*/

	/**
	* Fork revision request
	* @param revisionRequest {
	*   id: string;		
	* }
	*/
	async forkRevision(revisionRequest: any) {
		let res = await this._emilEnvSvc.post('forkRevision', revisionRequest);
		return res.json();
	}

	/*============================================================
	 == Revisions
	/============================================================*/

	/**
	* Fork revision request
	* @param revisionRequest {
	*   id: string;		
	* }
	*/
	async forkRevision(revisionRequest: any) {
		let res = await this._emilEnvSvc.post('forkRevision', revisionRequest);
		return res.json();
	}

	/*============================================================
	 == Templates and Patches
	/============================================================*/

	/**
	 * Gets a list of all available environment templates
	 */
	async getEnvironmentTemplates() {
		let res = await this._emilEnvSvc.get('getEnvironmentTemplates');
		return res.json();
	}

	/**
	 * Gets a list of all available patches
	 */
	async getPatches() {
		let res = await this._emilEnvSvc.get('getPatches');
		return res.json();
	}

	async getOperatingSystemMetadata() {
		let res = await this._emilEnvSvc.get('operatingSystemMetadata');
		return res.json();
	}

	async getNameIndexes() {
		let res = await this._emilEnvSvc.get('getNameIndexes');
		return res.json();
	}

	/*============================================================
	 == Helpers
	/============================================================*/

	/**
	 * Filters EaasiResource result using the provided case-insensitive query keyword
	 * @param query: IEaasiSearchQuery
	 * @param results: filtered IEaasiResource[]
	 * @private
	 */
	private _filterResults<T extends IEaasiResource>(query: IEaasiSearchQuery, results: IEaasiResource[]): IEaasiSearchResponse<T> {
		let totalResults = results.length;

		if (query.keyword) {
			let q = query.keyword.toLowerCase();
			results = results.filter(r => r.title && r.title.toLowerCase().indexOf(q) > -1);
		}

		results = this._paginate(query, results);

		return {
			totalResults,
			result: results as T[]
		};
	}

	/**
	 * Paginates a list of results according to parameters set on a `query` object
	 * @param query IEaasiSearchQuery
	 * @param results IEaasiResource the initial list of results to paginate
	 * @private
	 */
	private _paginate(query: IEaasiSearchQuery, results: IEaasiResource[]) {
		return results.slice((query.page - 1) * query.limit, query.page * query.limit);
	}

	private _filterByArchive(resources: any[], archive: string) {
		return resources.filter(r => r.archive === archive);
	}
}
