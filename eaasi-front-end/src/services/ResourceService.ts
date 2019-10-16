import { ISaveEnvironmentResponse } from '@/types/ISaveImageResponse';
import BaseHttpService from './BaseHttpService';
import { IResourceSearchQuery } from '@/types/Search';
import { IEnvironment } from '@/types/Resource';
import { IResourceSearchResponse } from '@/types/Search';


class ResourceService extends BaseHttpService {

	async getEnvironment(envId: string): Promise<IEnvironment> {
		let res = await this.get<IEnvironment>(`/resource/environment?id=${envId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let res = await this.post<IResourceSearchResponse>(
			'/resource/search',
			query
		);

		if (!res.ok) return null;

		return res.result;
	}

	/**
	 * Makes a request save (replicate) an Environment to local storage
	 * Response object contains task ID that can be used to query status
	 * @param environmentId: string
	 */
	async saveEnvironment(environmentId: string) : Promise<ISaveEnvironmentResponse> {
		let res = await this.post<any>(
			'/resource/save', { environmentId: environmentId }
		);

		if (!res.ok) return null;

		return res.result;
	}

}

export default new ResourceService();