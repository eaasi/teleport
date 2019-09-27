import {ResourceSearchResponse} from '@/models/resource/ResourceSearchResponse';
import {EaasiSearchQuery} from '@/models/search/EaasiSearchQuery.';
import {IEnvironment} from '@/types/emil/EmilEnvironmentData';
import {ISoftwarePackageDescription, ISoftwarePackageDescriptionsList} from '@/types/emil/EmilSoftwareData';
import {
	IEaasiResource,
	IEaasiSearchQuery,
	IEaasiSearchResponse,
	IResourceSearchQuery,
	IResourceSearchResponse
} from '@/types/resource/Resource';
import BaseService from '../base/BaseService';
import EmilBaseService from '../emil/EmilBaseService';

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

	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let q = new EaasiSearchQuery(query.keyword, 10);
		let result = new ResourceSearchResponse();
		let envReq = this._searchEnvironments(q);
		let sofReq = this._searchSoftware(q);
		let conReq = this._searchContent(q);
		result.environments = await envReq;
		result.software = await sofReq;
		result.content = await conReq;
		return result;
	}

	/*============================================================
	 == Environments
	/============================================================*/

	async getEnvironment(id: string): Promise<IEnvironment> {
		let res = await this._emilEnvSvc.get(id);
		return await res.json() as IEnvironment;
	}

	private async _searchEnvironments(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<IEnvironment>> {
		let res = await this._emilEnvSvc.get('');
		let list = await res.json() as IEnvironment[];
		return this._filterResults<IEnvironment>(query, list);
	}

	/*============================================================
	 == Software
	/============================================================*/

	async getSoftwareObject(id: string): Promise<any> {
		let res = await this._emilSofSvc.get(`getSoftwareObject?softwareId=${id}`);
		return await res.json();
	}

	async getSoftwarePackageDescription(id: string): Promise<IEnvironment> {
		let res = await this._emilSofSvc.get(`getSoftwarePackageDescription?softwareId=${id}`);
		return await res.json();
	}

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

	private async _searchContent(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<IEaasiResource>> {
		let content = []; // TODO
		return this._filterResults<IEnvironment>(query, content);
	}

	/*============================================================
	 == Helpers
	/============================================================*/

	private _filterResults<T extends IEaasiResource>(query: IEaasiSearchQuery, results: IEaasiResource[]): IEaasiSearchResponse<T> {
		let totalResults = results.length;

		if (query.keyword) {
			let q = query.keyword.toLowerCase();
			results = results.filter((r) => {
				return r.title && r.title.toLowerCase().indexOf(q) > -1;
			});
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
