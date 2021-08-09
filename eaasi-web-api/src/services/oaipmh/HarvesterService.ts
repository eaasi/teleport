import { HarvesterReq, HarvesterSyncResult } from '@/types/oaipmh/Harvester';
import HttpJSONService from '../base/HttpJSONService';

const OAI_PMH_SERVICE_ENDPOINT = process.env.OAI_PMH_SERVICE_ENDPOINT;

export default class HarvesterService {

	private readonly _svc: HttpJSONService;

	constructor(
		service = new HttpJSONService(),
	) {
		this._svc = service;
	}

	public async getHarvesters(token?: string): Promise<string[]> {
		let res = await this.get('harvesters', token);
		return await res.json() as string[];
	}

	public async addHarvester(req: HarvesterReq, token?: string): Promise<boolean> {
		let res = await this.post('harvesters', req, token);
		return res.ok;
	}

	public async syncHarvester(name: string, full: boolean = false, token?: string): Promise<HarvesterSyncResult> {
		let url = `harvesters/${name}`;
		if (full) url += '?from=1970-01-01T00:00:00.000Z';
		let res = await this.post(url, null, token);
		return await res.json() as HarvesterSyncResult;
	}

	public async deleteHarvester(name: string, token?: string): Promise<boolean> {
		let res = await this.delete(`harvesters/${name}`, token);
		return res.ok;
	}

	public async getHarvester(name: string, token?: string): Promise<HarvesterReq> {
		let res = await this.get(`harvesters/${name}`, token);
		return await res.json() as HarvesterReq;
	}

	/*============================================================
	 == Private Methods
	/============================================================*/

	private async get(methodName: string, token?: string) {
		return await this._svc.get(this._createUrl(methodName), null, token);
	}

	private async post(methodName: string, data: any, token?: string) {
		return await this._svc.post(this._createUrl(methodName), data, null, token);
	}

	private async delete(methodName: string, token?: string) {
		return await this._svc.delete(this._createUrl(methodName), null, null, token);
	}

	private _createUrl(methodName: string): string {
		return `${OAI_PMH_SERVICE_ENDPOINT}/${methodName}`;
	}

}
