import BaseService from '../base/BaseService';
import { IEaasiResource, IEaasiSearchResponse, IResourceSearchQuery } from '@/types/resource/Resource';
import EmilBaseService from '../emil/EmilBaseService';
import { IEnvironmentList, IEnvironment } from '@/types/emil/EmilEnvironmentData';

export default class ResourceAdminService extends BaseService {

	private readonly _emilService: EmilBaseService;

	constructor(emilEnvService: EmilBaseService = new EmilBaseService('EmilEnvironmentData')) {
		super();
		this._emilService = emilEnvService;
	}

	async getEnvironments(): Promise<IEnvironment[]> {
		let res = await this._emilService.get('list');
		if(res.ok) {
			let list = await res.json() as IEnvironmentList;
			return list.environments;
		}
		return [];
	}

	async searchResources(query: IResourceSearchQuery): Promise<IEaasiSearchResponse<IEaasiResource>> {
		// TODO: Actually search all resources
		let result = await this.getEnvironments();
		let totalResults = result.length;

		// TODO: Search and pagination here is temporary for MVP demo purposes

		// Do keyword search
		if(query.keyword) {
			let q = query.keyword.toLowerCase();
			result = result.filter((env) => {
				return env.title.toLowerCase().indexOf(q) > -1;
			});
		}

		// Paginate
		result = result.slice((query.page - 1) * query.limit, query.page * query.limit);

		return { totalResults, result };
	}

}