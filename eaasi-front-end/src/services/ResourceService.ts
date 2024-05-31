import { IEnvironmentUpdateRequest, IReplicateEnvironmentRequest } from '@/helpers/ResourceHelper';
import BaseHttpService from '@/services/BaseHttpService';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { IImageDeletePayload, IPatch, ITemplate } from '@/types/Import';
import { ISaveEnvironmentResponse } from '@/types/ISaveImageResponse';
import { IEnvironment } from '@/types/Resource';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { archiveTypes } from '@/utils/constants';
import config from '@/config';
import ResourceSearchQuery from '@/models/search/ResourceSearchQuery';


class ResourceService extends BaseHttpService {

	async getEnvironment(envId: string): Promise<IEnvironment> {
		const res = await this.get<IEnvironment>(`/resource/environment?id=${envId}`);
		if(!res.ok) return null;
		return res.result;
	}

	/**
	 * Makes a POST request to search all available resources
	 * @param { IResourceSearchQuery } query
	 */
	async searchResources(query: IResourceSearchQuery, userId: string): Promise<IResourceSearchResponse> {
		if (query) {
			query = ResourceSearchQuery.prepare(query);
		}

		const res = await this.post<IResourceSearchResponse>('/resource/search?userId=' + userId, query);
		if (!res.ok) return null;
		return res.result;
	}

	/**
	 * Makes a POST request to save (replicate) an Environment to local storage
	 * Response object contains task ID that can be used to query status
	 * @body {IReplicateEnvironmentRequest} {
	 *   destArchive: ArchiveType;
	 *   replicateList: string[];
	 * }
	 */
	async replicateEnvironment(replicateEnvironmentRequest: IReplicateEnvironmentRequest): Promise<ISaveEnvironmentResponse> {
		const res = await this.post<IEaasiTaskListStatus>('/resource/replicate-environment', replicateEnvironmentRequest);
		if (!res.ok) {
			console.error('Response returned error: ', res);
			return null;
		}

		return res.result as ISaveEnvironmentResponse;
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
		const res = await this.delete<any>(
			`/resource/environment/?id=${environmentId}`
		);
		return res.result;
	}

	/**
	 * Makes a GET request to get available system templates
	 */
	async getTemplates(): Promise<ITemplate[]> {
		const res = await this.get<ITemplate[]>('/resource/templates');
		return res.result;
	}

	/**
	 * Makes a GET request to get available system patches
	 */
	async getPatches(): Promise<IPatch[]> {
		const res = await this.get<IPatch[]>('/resource/patches');
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve Name Indexes
	 */
	async getEmulators() {
		const res = await this.get<any>('/resource/emulators');
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve operatingSystemMetadata
	 */
	async operatingSystemMetadata() {
		const res = await this.get<any>('/resource/operatingSystemMetadata');
		return res.result;
	}

	async forkRevision(id: string) {
		const res = await this.post<any>('/resource/fork-revision', { id });
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve list of object archives
	 */
	async getObjectArchives() {
		const res = await this.get<any>('/resource/objectArchive');
		return res.result;
	}

	/**
	 * Makes a POST request to save a new Environment resource from an existing environment ID via snapshot
	 */
	async saveNewEnvironment(envId: string, componentId: string, title: string, description: string) {
		const res = await this.post<any>('/resource/save-new-environment',
			{ envId, componentId, title, description }
		);
		return res.result;
	}

	/**
	 * Makes a POST request to save a new Content ("Object") Environment resource via snapshot
	 */
	async saveNewObjectEnvironment(envId: string, componentId: string, objectId: string, title: string, description: any) {
		const res = await this.post<any>('/resource/save-new-object-environment',
			{ envId, componentId, objectId, title, description }
		);
		return res.result;
	}

	/**
	 * Makes a POST request to save a revision of an existing Environment resource via snapshot
	 */
	async saveEnvironmentRevision(envId: string, componentId: string, description: any, environment: IEnvironment = null) {
		const res = await this.post<any>('/resource/save-environment-revision',
			{ envId, componentId, description }
		);
		return res.result;
	}

	/**
	 * Makes a POST request to publish a list of local environment to the network
	 * Currently hits the same emil endpoint as 'replicate-environment' with 'public' destArchive
	 * @param envId
	 */
	async publishEnvironmentsToNetwork(envIds: string[]) {
		const res = await this.post<any>('/resource/replicate-environment',
			{
				replicateList: envIds,
				destArchive: archiveTypes.PUBLIC
			}
		);
		return res.result;
	}

	/**
	 * Makes a POST request to delete an image
	 * @param payload: IImageDeletePayload
	 */
	async deleteImage(payload: IImageDeletePayload) {
		const res = await this.post('/resource/delete-image', payload);
		return res.result;
	}

	async getResourceOwner(ownerId: string) {
		const res = await this.get('/resource/owner?ownerId=' + ownerId);
		return res.result;
	}

	async deleteSoftware(id: string) {
		await this.delete(`/resource/delete-software-object?id=${id}`);
	}


	/**
	 * Makes a POST request to synchronizate image archives
	 */
	async syncImagesUrl() {
		const res = await this.postLocal('/emil/environment-repository/actions/sync');
		return res.result;
	}

	/**
	 * Makes a POST request to synchronizate object archives
	 */
	async syncObjectsUrl() {
		const res = await this.postLocal('/emil/object-repository/actions/sync');
		return res.result;
	}

	/**
	 * Makes a POST request to synchronizate software archives
	 */
	async syncSoftwareUrl() {
		const res = await this.postLocal('/emil/software-repository/actions/sync');
		return res.result;
	}
}

export default new ResourceService();