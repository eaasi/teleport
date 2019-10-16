import BaseHttpService from './BaseHttpService';
import { IResourceSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiResource, IEnvironment } from '@/types/Resource';
import { IResourceSearchResponse } from '@/types/Search';

class ResourceService extends BaseHttpService {

	async getEnvironment(envId: string): Promise<IEnvironment> {
		let res = await this.get<IEnvironment>(`/resource/environment?id=${envId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let res = await this.post<IResourceSearchResponse>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}

	async replicateEnvironment(environmentId: string) {

		let replicateEnvPayload : IReplicateImageRequest = {
			replicateList: [environmentId],
			destArchive: 'public'
		};

		let res = await this.post<any>('/replicateImage', replicateEnvPayload);

		console.log('GOT REST in replicateEnvironment:', res);
	}

}

export default new ResourceService();