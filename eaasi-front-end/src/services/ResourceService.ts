import { ISaveEnvironmentResponse } from '@/types/ISaveImageResponse';
import BaseHttpService from './BaseHttpService';
import { IResourceSearchQuery } from '@/types/Search';
import { IEnvironment } from '@/types/Resource';
import { IResourceSearchResponse } from '@/types/Search';
import { IEnvironmentUpdateRequest } from '@/helpers/ResourceHelper';


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

		return res.result as ISaveEnvironmentResponse;
	}

	async updateEnvironmentDetails(environment: IEnvironmentUpdateRequest) {
		const res = await this.post<any>('/resource/update-environment', { environment });
		if (!res.ok) {
			console.log('Response returned error: ', res);
			return null;
		}

		return res.result;
	}

	/**
	 * Makes a DELETE request to delete an Environment from local node
	 * @param environmentId: string
	 */
	async deleteEnvironment(environmentId: string) {
		let res = await this.delete<any>(
			`/resource/environment/?id=${environmentId}`
		);
		return res.result;
	}

	/**
	 * Makes a GET request to get available system templates
	 */
	async getTemplates() {
		let res = await this.get<any>(
			'/resource/environmentTemplates'
		);
		return res.result['systems'];
	}

	async getNameIndexes() {
		let res = await this.get<any>('/resource/nameIndexes');
		return res.result;
	}

	async operatingSystemMetadata() {
		let res = await this.get<any>('/resource/operatingSystemMetadata');
		return res.result;
	}
}

export default new ResourceService();