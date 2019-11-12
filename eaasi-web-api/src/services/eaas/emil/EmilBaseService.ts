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
		console.log('Making Request to URL:', url);
		return await this._svc.get(this._createUrl(methodName));
	}

	public async post(methodName: string, data: any) {
		let url = this._createUrl(methodName);
		console.log('::: EmilBaseService ::: making POST request to URL:', url);
		console.log('::: EmilBaseService ::: post body is:', data);
		return await this._svc.post(this._createUrl(methodName), data);
	}

	private _createUrl(methodName: string): string {
		let url = `${BASE_URL}/${this._path}/${methodName}`;
		return url
	}
}
