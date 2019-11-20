import HttpJSONService from '@/services/base/HttpJSONService';
import IHttpService from '@/services/interfaces/IHttpService';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';

const BASE_URL = process.env.EAAS_JAVA_SERVICE_URL;

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

		let url = `${BASE_URL}/emil/components/${componentId}/snapshot`;
		let res = await this._httpService.post(url, snapshot);
		let response = await res.json();

		return await response;
	}
}
