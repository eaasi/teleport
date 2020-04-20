import HttpJSONService from '@/services/base/HttpJSONService';
import IHttpService from '@/services/interfaces/IHttpService';
import { ICreateEnvironmentPayload, IImportObjectRequest, IUploadRequest } from '@/types/emil/Emil';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';

const EMIL_SERVICE_ENDPOINT = process.env.EMIL_SERVICE_ENDPOINT;

/**
 * Handles resource import processes
 */
export default class ImportService extends BaseService {

	private readonly _emilEnvService: EmilBaseService;
	private readonly _httpService: IHttpService;

	constructor(
		envService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
		httpService: IHttpService = new HttpJSONService()
	) {
		super();
		this._emilEnvService = envService;
		this._httpService = httpService;
	}

	/**
	 * Posts Resource Import Data to trigger import task from a URL
	 */
	async importResourceFromUrl(importData: any) {
		let res = await this._emilEnvService.post('importImage', importData);
		return await res.json();
	}

	/**
	 * Posts to components endpoint
	 * @param body
	 */
	async postComponents(body: any) {
		let url = `${EMIL_SERVICE_ENDPOINT}/components`;
		let res = await this._httpService.post(url, body);
		return await res.json();
	}

	/**
	 * Posts Snapshot data to trigger saving an imported resource
	 */
	async snapshotImage(snapshotData: any) {
		let componentId = snapshotData.componentId;

		let snapshot = {
			envId: snapshotData.environmentId,
			isRelativeMouse: snapshotData.isRelativeMouse,
			message: snapshotData.importSaveDescription,
			objectId: null,
			softwareId: null,
			title: snapshotData.title,
			type: 'saveImport',
			userId: null
		};

		let url = `${EMIL_SERVICE_ENDPOINT}/components/${componentId}/snapshot`;
		let res = await this._httpService.post(url, snapshot);
		return await res.json();
	}

	/**
	 * Posts payload to create and environment
	 * @param payload
	 */
	async createEnvironment(payload: ICreateEnvironmentPayload) {
		let url = `${EMIL_SERVICE_ENDPOINT}/EmilEnvironmentData/createEnvironment`;
		let res = await this._httpService.post(url, payload);
		let response = await res.json();
		return response;
	}

	/**
	 * Posts Object Import Request data
	 * @param req : Request with req.body
	 */
	// using object deconstruct because /objects/import will throw 400 if requestObject will contain properties that weren't expected
	async importResourceFromFile({ files, label }: IImportObjectRequest) {
		const importRequest = { files, label };
		let url = `${EMIL_SERVICE_ENDPOINT}/objects/import`;
		let res = await this._httpService.post(url, importRequest);
		return await res.json();
	}

	/***
	 * Posts form data containing files
	 * @param req : Request with req.files
	 */
	async uploadFiles(req: IUploadRequest) {
		let url = `${EMIL_SERVICE_ENDPOINT}/upload`;
		let responses = [];
		req.files.forEach(async file => {
			let res = await this._httpService.postUpload(url, file);
			responses.push(res);
		});
		return responses;
	}

}
