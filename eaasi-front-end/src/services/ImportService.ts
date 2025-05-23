import config from '@/config';
import EaasiTask from '@/models/task/EaasiTask';
import { IEmilUploadResponse } from '@/types/Eaas';
import { ICreateEnvironmentPayload, IEnvironmentImportSnapshot, IImageImportPayload, IImportObjectRequest, IResourceImport, IResourceImportFile } from '@/types/Import';
import { ISoftwareObject } from '@/types/Resource';
import { IUserImportedResource, IUserImportRelationRequest } from '@/types/UserImportRelation';
import BaseHttpService from './BaseHttpService';


/**
 * Handles making requests for importing images
 */
class ImportService extends BaseHttpService {
	/**
	 * Makes a POST request to save an imported environment
	 * @param {IEnvironmentImportSnapshot} snapshot
	 */
	async saveEnvironment(snapshot: IEnvironmentImportSnapshot) : Promise<any> {
		const res = await this.post<IResourceImport>(
			'/import/saveEnvironment', snapshot
		);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result;
	}

	/**
	 * Makes a POST request for Content or Software Resource files
	 * @param {IResourceImportFile[]} filesToUpload
	 */
	async uploadContentResourceFiles(filesToUpload: IResourceImportFile[]) : Promise<IEmilUploadResponse> {
		const result: IEmilUploadResponse = {
			status: '0',
			uploads: [],
		};

		const uploadUrl = '/emil/upload';
		for (const file of filesToUpload) {
			const res = await this.postUploadExtended<IEmilUploadResponse>(uploadUrl, file);
			if (!res.result.status) {
				console.error('Response returned error: ', res);
				return null;
			}

			result.uploads.push(...res.result.uploads);
		}

		return result;
	}

	/**
	 *  Makes a POST request with URL string for importing uploaded Blobs
	 * @param {IImportObjectRequest} objectUploadPayload
	 */
	async importUploadBlob(objectUploadPayload: IImportObjectRequest) : Promise<EaasiTask> {
		const res = await this.post<IResourceImport>(
			'/import/files', objectUploadPayload
		);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result as EaasiTask;
	}

	/**
	 *  Makes a POST request with to save a Content Object as a Software Object
	 * @param {ISoftwareObject} payload
	 */
	async saveSoftwareObject(payload: ISoftwareObject) {
		const res = await this.post<any>('/resource/save-software-object', payload);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result;
	}

	/**
	 *  Makes a POST request with URL string for importing an environment
	 * @param {ICreateEnvironmentPayload} createEnvironmentPayload
	 */
	async createEnvironment(createEnvironmentPayload: ICreateEnvironmentPayload) {
		const res = await this.post<any>('/import/createEnvironment', createEnvironmentPayload);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result;
	}

	/**
	 *  Makes a POST request with URL string for importing an environment
	 * @param {ICreateEnvironmentPayload} createEnvironmentPayload
	 */
	async importImage(payload: IImageImportPayload) {
		const res = await this.post<any>('/import/import-image', payload);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result;
	}

	/**
	 *  Makes a POST request to components endpoint
	 * @param payload
	 */
	async postComponents(payload) {
		const res = await this.post<any>('/import/postComponents', payload);
		if (!res.ok) {
			console.warn('Response returned error: ', res);
			return null;
		}
		return res.result;
	}

}

export default new ImportService();