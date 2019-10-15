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
		console.log('todo: ResourceService replicateEnvironment');
		// POST REQUEST PAYLOAD
		// {replicateList: ["d15443af-a2ac-4695-a5ec-3acb4c4b79d715"], destArchive: "public"}
		// destArchive: "public"
		// replicateList: ["d15443af-a2ac-4695-a5ec-3acb4c4b79d715"]
		// 0: "d15443af-a2ac-4695-a5ec-3acb4c4b79d715"
	}

}

export default new ResourceService();