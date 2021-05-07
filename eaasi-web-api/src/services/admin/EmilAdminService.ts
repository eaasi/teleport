import EmilBaseService from '../base/EmilBaseService';

export default class EmilAdminService {

	private readonly _svc: EmilBaseService;

	constructor(
		svc: EmilBaseService = new EmilBaseService('admin'),
	) {
		this._svc = svc;
	}

	async getApiKey(token?: string) {
		const res = await this._svc.get('apikey', token);
		return  await res.json();
	}

}