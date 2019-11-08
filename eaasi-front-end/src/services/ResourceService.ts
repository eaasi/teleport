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
	 * Makes a POST request to save (replicate) an Environment to local storage
	 * Response object contains task ID that can be used to query status
	 * @param environmentId: string
	 */
	async saveEnvironment(environmentId: string) : Promise<ISaveEnvironmentResponse> {
		let res = await this.post<any>(
			'/resource/save', { environmentId: environmentId }
		);

		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}

		console.log('ResourceService RES.RESULT', res.result);
		return res.result as ISaveEnvironmentResponse;
	}

	/**
	 * Makes a DELETE request to delete an Environment from local node
	 * @param environmentId: string
	 */
	async deleteEnvironment(environmentId: string) {
		console.log('deleting...', environmentId);
		let res = await this.delete<any>(
			'/resource/delete/' + environmentId
		);
		return res.result;
	}
}

export default new ResourceService();