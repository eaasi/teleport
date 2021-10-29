import { IContent, IContentRequest, IObjectClassificationRequest, IOverrideContentRequest, ISoftwareObject, ISoftwarePackage } from '@/types/Resource';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import BaseHttpService from './BaseHttpService';
import { IEmilResult } from '@/types/Http';

class SoftwareService extends BaseHttpService {

	async getSoftware(softwareId : string): Promise<ISoftwarePackage> {
		const res = await this.get<ISoftwarePackage>(`/resource/software?id=${softwareId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async getSoftwareObject(softwareId : string): Promise<ISoftwareObject> {
		const res = await this.get<ISoftwareObject>(`/resource/software-object?id=${softwareId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async getSoftwareObjects(softwareIds : string[]): Promise<ISoftwareObject[]> {
		const ids = softwareIds.join(',');
		const res = await this.get<ISoftwareObject[]>(`/resource/software-objects?ids=${ids}`);
		if(!res.ok) return null;
		return res.result;
	}

	async searchSoftware(query: IResourceSearchQuery, userId: string): Promise<IResourceSearchResponse> {
		const res = await this.post<IResourceSearchResponse>('/resource/search?userId=' + userId, query);
		if (!res.ok) return null;
		return res.result;
	}

	async classify(classificationRequest: IObjectClassificationRequest) {
		const res = await this.post<any>('/resource/classify', classificationRequest);
		if (!res.ok) return null;
		return res.result;
	}

	async getSoftwareMetadata(archiveId: string, objectId: string) {
		const res = await this.get(`/resource/software-metadata?archiveId=${archiveId}&objectId=${objectId}`);
		if (!res.ok) return null;
		return res.result;
	}

	async saveSoftwareObject(softwareObject: ISoftwareObject): Promise<IEmilResult> {
		const res = await this.post<IEmilResult>('/resource/save-software-object', softwareObject);
		if (!res.ok) return null;
		return res.result as IEmilResult;
	}

	async getContent({ archiveName, contentId }: IContentRequest): Promise<IContent> {
		const res = await this.get<IContent>(`/resource/content?archiveName=${archiveName}&contentId=${contentId}`);
		if(!res.ok) return null;
		return res.result;
	}

	async deleteContent({ archiveName, contentId }: IContentRequest) {
		await this.delete(`/resource/content?archiveName=${archiveName}&contentId=${contentId}`);
	}

	async saveContent(overrideRequest: IOverrideContentRequest) {
		const res = await this.post<any>('/resource/content', overrideRequest);
		if (!res.ok) return null;
		return res.result;
	}

	async publishSoftware(softwareIds: string[]): Promise<IEmilResult[]> {
		const self = this;
		const objects = await this.getSoftwareObjects(softwareIds);
		if(!objects) return null;
		const results = await Promise.all(objects.map(object => {
			object.isPublic = true;
			return self.saveSoftwareObject(object);
		}));
		if(results.some(x => x === null)) return null;
		return results;
	}
}

export default new SoftwareService();