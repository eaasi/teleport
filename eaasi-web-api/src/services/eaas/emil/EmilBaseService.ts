import HttpJSONService from '../../base/HttpJSONService';
import IHttpService from '../../interfaces/IHttpService';

const BASE_URL = process.env.EAAS_JAVA_SERVICE_URL + '/emil';

export default class EmilBaseService implements IHttpService {

	protected readonly _path: string
	private readonly _svc: HttpJSONService

	constructor(servicePath: string) {
		this._path = servicePath;
		this._svc = new HttpJSONService();
	}

	public async get(methodName: string) {
		return await this._svc.get(this._createUrl(methodName));
	}

	public async post(methodName: string, data: any) {
		return await this._svc.post(this._createUrl(methodName), data);
	}

	private _createUrl(methodName: string): string {
		return `${BASE_URL}/${this._path}/${methodName}`;
	}

}