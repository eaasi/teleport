import BaseHttpService from './BaseHttpService';
import {ISoftwarePackage} from '@/types/Resource';
import {IResourceSearchQuery, IResourceSearchResponse} from '@/types/Search';

class SoftwareService extends BaseHttpService {

	async getSoftware(softwareId : string): Promise<ISoftwarePackage> {
		let res = await this.get<ISoftwarePackage>(`/resource/software?id=${softwareId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async searchSoftware(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let res = await this.post<IResourceSearchResponse>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}
}

export default new SoftwareService();