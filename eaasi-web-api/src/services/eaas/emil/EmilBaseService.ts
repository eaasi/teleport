import AppLogger from '@/logging/appLogger';
import HttpJSONService from '../../base/HttpJSONService';
import IHttpService from '../../interfaces/IHttpService';

const EMIL_SERVICE_ENDPOINT = process.env.EMIL_SERVICE_ENDPOINT;

export default class EmilBaseService implements IHttpService {

	protected readonly _path: string;
	private readonly _svc: IHttpService;
	private _logger: AppLogger;

	constructor(
		servicePath: string, 
		service: IHttpService = new HttpJSONService(), 
	) {
		this._path = servicePath;
		this._svc = service;
		this._logger = new AppLogger(this.constructor.name);
	}

	public async get(methodName: string) {
		let url = this._createUrl(methodName);
		this._logger.log.info(`Making GET Request to URL: ${url}`);
		return await this._svc.get(url);
	}

	public async post(methodName: string, data: any) {
		let url = this._createUrl(methodName);
		this._logger.log.info(`Making POST Request to URL: ${url}`);
		return await this._svc.post(url, data);
	}

	public async delete(methodName: string) {
		let url = this._createUrl(methodName);
		return await this._svc.delete(url);
	}

	private _createUrl(methodName: string): string {
		return `${EMIL_SERVICE_ENDPOINT}/${this._path}/${methodName}`
	}

	postUpload(url: string, data: any, options?: any): Promise<any> {
		// TODO: TBD if upload data is posted from the API layer
		return undefined;
	}
}
