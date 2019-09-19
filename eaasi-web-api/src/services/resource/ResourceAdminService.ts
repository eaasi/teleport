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
		let environments = await this.getEnvironments();
		return {
			totalResults: environments.length,
			result: environments
		};
	}

}