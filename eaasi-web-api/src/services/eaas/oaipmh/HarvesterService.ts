import { HarvesterReq, HarvesterSyncResult } from '@/types/oaipmh/Harvester';
import HttpJSONService from '../../base/HttpJSONService';

const OAI_PMH_SERVICE_ENDPOINT = process.env.OAI_PMH_SERVICE_ENDPOINT;

export default class HarvesterService {

	private readonly _svc: HttpJSONService;

	constructor(service = new HttpJSONService()) {
		this._svc = service;
	}

	public async getHarvesters(): Promise<string[]> {
		let res = await this.get('harvesters');
		return await res.json() as string[];
	}

	public async addHarvester(req: HarvesterReq): Promise<boolean> {
		let res = await this.post('harvesters', req);
		return res.ok;
	}

	public async syncHarvester(name: string, full: boolean = false): Promise<HarvesterSyncResult> {
		let url = `harvesters/${name}`;
		if (full) url += '?from=1970-01-01T00:00:00.000Z';
		let res = await this.post(url, null);
		return await res.json() as HarvesterSyncResult;
	}

	public async deleteHarvester(name: string): Promise<boolean> {
		let res = await this.delete(`harvesters/${name}`);
		return res.ok;
	}

	/*============================================================
	 == Private Methods
	/============================================================*/

	private async get(methodName: string) {
		return await this._svc.get(this._createUrl(methodName));
	}

	private async post(methodName: string, data: any) {
		return await this._svc.post(this._createUrl(methodName), data);
	}

	private async delete(methodName: string) {
		return await this._svc.delete(this._createUrl(methodName));
	}

	private _createUrl(methodName: string): string {
		return `${OAI_PMH_SERVICE_ENDPOINT}/${methodName}`;
	}

}
