import HttpJSONService from '@/services/base/HttpJSONService';
import IHttpService from '@/services/interfaces/IHttpService';
import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';

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
}
