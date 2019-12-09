import BaseHttpService from './BaseHttpService';
import {ISoftwarePackage, IObjectClassificationRequest, ISoftwareObject, IContentRequest, IContent, IOverrideContentRequest} from '@/types/Resource';
import {IResourceSearchQuery, IResourceSearchResponse} from '@/types/Search';

class SoftwareService extends BaseHttpService {

	async getSoftware(softwareId : string): Promise<ISoftwarePackage> {
		let res = await this.get<ISoftwarePackage>(`/resource/software?id=${softwareId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async getSoftwareObject(softwareId : string): Promise<ISoftwarePackage> {
		let res = await this.get<ISoftwarePackage>(`/resource/software-object?id=${softwareId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async searchSoftware(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let res = await this.post<IResourceSearchResponse>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}

	async classify(classificationRequest: IObjectClassificationRequest) {
		let res = await this.post<any>('/resource/classify', classificationRequest);
		if (!res.ok) return null;
		return res.result;
	}

	async getSoftwareMetadata(archiveId: string, objectId: string) {
		let res = await this.get(`/resource/software-metadata?archiveId=${archiveId}&objectId=${objectId}`);
		if (!res.ok) return null;
		return res.result;
	}

	async saveSoftwareObject(softwareObject: ISoftwareObject) {
		let res = await this.post('/resource/save-software-object', softwareObject);
		if (!res.ok) return null;
		return res.result;
	}

	async getContent({ archiveName, contentId }: IContentRequest): Promise<IContent> {
		let res = await this.get<IContent>(`/resource/content?archiveName=${archiveName}&contentId=${contentId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async saveContent(overrideRequest: IOverrideContentRequest) {
		let res = await this.post<any>('/resource/content', overrideRequest);
		if (!res.ok) return null;
		return res.result;
	}
}

export default new SoftwareService();