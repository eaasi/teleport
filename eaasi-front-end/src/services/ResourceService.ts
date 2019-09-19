import BaseHttpService from './BaseHttpService';
import { IResourceSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { IEaasiResource } from '@/types/Resource';

class ResourceService extends BaseHttpService {

	async searchResources(query: IResourceSearchQuery): Promise<IEaasiSearchResponse<IEaasiResource>> {
		let res = await this.post<IEaasiSearchResponse<IEaasiResource>>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}

}

export default new ResourceService();