import BaseService from '../base/BaseService';
import { IResourceSearchQuery, IResourceSearchResponse, IEaasiSearchResponse, IEaasiSearchQuery, IEaasiResource, IResourceSearchFacet } from '@/types/resource/Resource';
import EmilBaseService from '../emil/EmilBaseService';
import { IEnvironmentList, IEnvironment } from '@/types/emil/EmilEnvironmentData';
import { ResourceSearchResponse } from '@/models/resource/ResourceSearchResponse';
import { EaasiSearchQuery } from '@/models/search/EaasiSearchQuery.';
import { ISoftwarePackageDescription, ISoftwarePackageDescriptionsList } from '@/types/emil/EmilSoftwareData';
import { ENFILE } from 'constants';

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
		let env = await res.json() as IEnvironment;
		return env;
	}

	private async _searchEnvironments(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<IEnvironment>> {
		let res = await this._emilEnvSvc.get('');
		let list = await res.json() as IEnvironment[];
		return this._filterResults<IEnvironment>(query, list);
	}

	/*============================================================
	 == Software
	/============================================================*/

	private async _searchSoftware(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<ISoftwarePackageDescription>> {
		let res = await this._emilSofSvc.get('getSoftwarePackageDescriptions');
		let list = await res.json() as ISoftwarePackageDescriptionsList;
		// console.log(list);
		let software = list.descriptions;
		// TODO: we need to esnure all responses adhere to IEaasiResource
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
		if(query.keyword) {
			let q = query.keyword.toLowerCase();
			results = results.filter((r) => {
				return r.title && r.title.toLowerCase().indexOf(q) > -1;
			});
		}

		// Paginate
		results = results.slice((query.page - 1) * query.limit, query.page * query.limit);
		return {
			totalResults,
			result: results as T[]
		};
	}

}