import BaseHttpService from './BaseHttpService';
import { IEaasiSearchResponse } from 'eaasi-http';
import { IResourceSearchQuery } from '@/types/Search.d.ts';
import { IEaasiResource } from '@/types/Resource';

class ResourceService extends BaseHttpService {

	async searchResources(query: IResourceSearchQuery): Promise<IEaasiSearchResponse<IEaasiResource>> {
		let res = await this.post<IEaasiSearchResponse<IEaasiResource>>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}

}

export default new ResourceService();