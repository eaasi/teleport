import BaseHttpService from './BaseHttpService';
import {ISoftwarePackage} from '@/types/Resource';

class SoftwareService extends BaseHttpService {

	async getSoftware(softwareId : string): Promise<ISoftwarePackage> {
		let res = await this.get<ISoftwarePackage>(`/resource/software?id=${softwareId}`);
		console.log(res)
		if(!res.ok) return null;
		return res.result;
	}
}

export default new SoftwareService();