import HttpJSONService from '../../base/HttpJSONService';
import IHttpService from '../../interfaces/IHttpService';

const BASE_URL = process.env.EAAS_JAVA_SERVICE_URL + '/emil';

export default class EmilBaseService implements IHttpService {

	protected readonly _path: string;
	private readonly _svc: IHttpService;

	constructor(servicePath: string, service: IHttpService = new HttpJSONService()) {
		this._path = servicePath;
		this._svc = service;
	}

	public async get(methodName: string) {
		let url = this._createUrl(methodName);
		console.log('Making GET Request to URL:', url);
		return await this._svc.get(url);
	}

	public async post(methodName: string, data: any) {
		let url = this._createUrl(methodName);
		console.log('Making POST Request to URL:', url);
		return await this._svc.post(url, data);
	}

	public async delete(methodName: string) {
		let url = this._createUrl(methodName);
		return await this._svc.delete(url);
	}

	private _createUrl(methodName: string): string {
		return `${BASE_URL}/${this._path}/${methodName}`
	}

	postUpload(url: string, data: any, options?: any): Promise<any> {
		// TODO: TBD if upload data is posted from the API layer
		return undefined;
	}
}
