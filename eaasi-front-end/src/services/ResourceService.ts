import { IEnvironmentUpdateRequest, IReplicateEnvironmentRequest } from '@/helpers/ResourceHelper';
import BaseHttpService from '@/services/BaseHttpService';
import { IEmulatorComponentRequest, ITempEnvironmentRecord } from '@/types/Emulation';
import { IEaasiTaskListStatus } from '@/types/IEaasiTaskListStatus';
import { IPatch, ITemplate } from '@/types/Import';
import { ISaveEnvironmentResponse } from '@/types/ISaveImageResponse';
import { IEnvironment } from '@/types/Resource';
import { IResourceSearchQuery, IResourceSearchResponse } from '@/types/Search';
import { archiveTypes } from '@/utils/constants';


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
		let res = await this.delete<any>(
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

	async forkRevision(id: string) {
		let res = await this.post<any>('/resource/fork-revision', { id });
		return res.result;
	}

	/**
	 * Makes a GET request to retrieve list of object archives
	 */
	async getObjectArchives() {
		let res = await this.get<any>('/resource/objectArchive');
		return res.result;
	}

	/**
	 * Makes a POST request to save a new Environment resource from an existing environment ID via snapshot
	 */
	async saveNewEnvironment(envId: string, componentId: string, title: string, description: string) {
		let res = await this.post<any>('/resource/save-new-environment',
			{ envId, componentId, title, description }
		);
		return res.result;
	}

	/**
	 * Makes a POST request to save a new Content ("Object") Environment resource via snapshot
	 */
	async saveNewObjectEnvironment(envId: string, componentId: string, objectId: string, title: string, description: any) {
		let res = await this.post<any>('/resource/save-new-object-environment',
			{ envId, componentId, objectId, title, description }
		);
		return res.result;
	}

	/**
	 * Makes a POST request to save a revision of an existing Environment resource via snapshot
	 */
	async saveEnvironmentRevision(envId: string, componentId: string, description: any) {
		let res = await this.post<any>('/resource/save-environment-revision',
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
		let res = await this.post<any>('/resource/replicate-environment',
			{
				replicateList: envIds,
				destArchive: archiveTypes.PUBLIC
			}
		);
		return res.result;
	}

	async addEnvironmentToTempArchive(payload: IEmulatorComponentRequest) {
		let res = await this.post<IEnvironment>('/resource/temp/create', payload);
		return res.result;
	}

	async deleteEnvironmentFromTempArchive(envId: string) {
		let res = await this.delete(`/resource/temp/${envId}`);
		return res.result;
	}

	async getAllTemp(): Promise<ITempEnvironmentRecord[]> {
		let res = await this.get<ITempEnvironmentRecord[]>('/resource/temp/get-all');
		return res.result;
	}
	
}

export default new ResourceService();