import BaseHttpService from '@/services/BaseHttpService';
import { ISaveEnvironmentResponse } from '@/types/ISaveImageResponse';
import { IResourceSearchQuery } from '@/types/Search';
import { IEnvironment } from '@/types/Resource';
import { IResourceSearchResponse } from '@/types/Search';
import { IEnvironmentUpdateRequest, IReplicateImageRequest } from '@/helpers/ResourceHelper';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';


class ResourceService extends BaseHttpService {

	async getEnvironment(envId: string): Promise<IEnvironment> {
		let res = await this.get<IEnvironment>(`/resource/environment?id=${envId}`);
		if(!res.ok) return null;
		return res.result;
	}

	/**
	 * Makes a POST request to search all available resources
	 * @param { IResourceSearchQuery } query
	 */
	async searchResources(query: IResourceSearchQuery): Promise<IResourceSearchResponse> {
		let res = await this.post<IResourceSearchResponse>('/resource/search', query);
		if (!res.ok) return null;
		return res.result;
	}

	/**
	 * Makes a POST request to save (replicate) an Environment to local storage
	 * Response object contains task ID that can be used to query status
	 * @param {string} environmentId
	 */
	async saveEnvironment(environmentId: string) : Promise<ISaveEnvironmentResponse> {
		let res = await this.post<any>(
			'/resource/save', { environmentId: environmentId }
		);

		if (!res.ok) {
			console.error('Response returned error: ', res);
			return null;
		}

		return res.result as ISaveEnvironmentResponse;
	}

	async replicateImage(replicateRequest: IReplicateImageRequest): Promise<IEaasiTaskListStatus> {
		const res = await this.post<IEaasiTaskListStatus>('/resource/replicate-image', replicateRequest);
		if (!res.ok) {
			console.error('Response returned error: ', res);
			return null;
		}
		
		return res.result;
	}

	/**
	 * Makes a POST request to update Environment details.
	 * @param {IEnvironmentUpdateRequest} environment update request
	 */
	async updateEnvironmentDetails(environment: IEnvironmentUpdateRequest) {
		const res = await this.post<any>('/resource/update-environment', { environment });
		if (!res.ok) {
			console.error('Response returned error: ', res);
			return null;
		}

		return res.result;
	}

	/**
	 * Makes a DELETE request to delete an Environment from local node
	 * @param {string} environmentId
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

	/**
	 * Makes a GET request to retrieve Name Indexes
	 */
	async getNameIndexes() {
		let res = await this.get<any>('/resource/nameIndexes');
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve operatingSystemMetadata
	 */
	async operatingSystemMetadata() {
		let res = await this.get<any>('/resource/operatingSystemMetadata');
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve list of object archives
	 */
	async getObjectArchives() {
		let res = await this.get<any>('/resource/objectArchive');
		return res.result;
	}
}

export default new ResourceService();