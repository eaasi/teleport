import {ResourceSearchResponse} from '@/models/resource/ResourceSearchResponse';
import SaveEnvironmentRequest from '@/models/resource/SaveEnvironmentRequest';
import {EaasiSearchQuery} from '@/models/search/EaasiSearchQuery.';
import {IEnvironment} from '@/types/emil/EmilEnvironmentData';
import {ISoftwarePackageDescription, ISoftwarePackageDescriptionsList} from '@/types/emil/EmilSoftwareData';
import {
	IEaasiResource,
	IEaasiSearchQuery,
	IEaasiSearchResponse,
	IResourceSearchQuery,
	IResourceSearchResponse, ISaveEnvironmentResponse
} from '@/types/resource/Resource';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';
import { resourceTypes } from '@/utils/constants';

export default class ResourceAdminService extends BaseService {

	private readonly _emilEnvSvc: EmilBaseService;
	private readonly _emilSofSvc: EmilBaseService;

	constructor(
		emilEnvService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
		emilSofService: EmilBaseService = new EmilBaseService('EmilSoftwareData')
	) {
		super();
		this._emilEnvSvc = emilEnvService;
		this._emilSofSvc = emilSofService;
	}

	/**
	 * Searches Environment, Software, and Content Resources using the  provided IResourceSearchQuery
	 * @param query
	 */
	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let q = new EaasiSearchQuery(query.keyword, query.limit);
		let result = new ResourceSearchResponse();
		let envReq;
		let sofReq;
		let conReq;
		if (query.types && query.types.length > 0) {
			query.types.forEach(t => {
				if (t === 'Environment') envReq = this._searchEnvironments(q);
				else if (t === 'Software') sofReq = this._searchSoftware(q);
				else if (t === 'Content') conReq = this._searchContent(q);
			})
		} else {
			envReq = this._searchEnvironments(q);
			sofReq = this._searchSoftware(q);
			conReq = this._searchContent(q);
		}
		result.environments = envReq ? await envReq : { result: [], totalResults: 0 };
		result.software = sofReq ? await sofReq : { result: [], totalResults: 0 };
		result.content = conReq ? await conReq : { result: [], totalResults: 0 };
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
	 * Gets a Software Object by ID
	 * @param id: string softwareId
	 */
	async getSoftwareObject(id: string): Promise<any> {
		let res = await this._emilSofSvc.get(`getSoftwareObject?softwareId=${id}`);
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
		let content = []; // TODO
		return this._filterResults<IEnvironment>(query, content);
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

}
