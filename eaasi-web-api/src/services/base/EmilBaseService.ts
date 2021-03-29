import { Response } from 'node-fetch';
import IHttpService from '../interfaces/IHttpService';
import HttpJSONService from './HttpJSONService';
import {IAppLogger} from '@/types/general/log';
import AppLogger from '@/logging/appLogger';

const EMIL_SERVICE_ENDPOINT = process.env.EMIL_SERVICE_ENDPOINT;

export default class EmilBaseService implements IHttpService {

	protected readonly _path: string;
	private readonly _svc: IHttpService;
	private _logger: IAppLogger;

	constructor(
		servicePath: string,
		service: IHttpService = new HttpJSONService(),
	) {
		this._path = servicePath;
		this._svc = service;
		this._logger = AppLogger;
	}

	public async get(methodName: string, token?: string): Promise<Response> {
		let url = this._createUrl(methodName);
		return await this._svc.get(url, null, token);
	}

	public async post(methodName: string, data: any, token?: string): Promise<Response> {
		let url = this._createUrl(methodName);
		return await this._svc.post(url, data, null, token);
	}

	public async patch(methodName: string, data: any, token?: string): Promise<Response> {
		let url = this._createUrl(methodName);
		return await this._svc.patch(url, data, token);
	}

	public async delete(methodName: string, data: any = null, token?: string): Promise<Response> {
		let url = this._createUrl(methodName);
		return await this._svc.delete(url, data, token);
	}

	private _createUrl(methodName: string): string {
		return `${EMIL_SERVICE_ENDPOINT}/${this._path}/${methodName}`
	}

	postUpload(url: string, data: any, options?: any): Promise<any> {
		// TODO: TBD if upload data is posted from the API layer
		return undefined;
	}
}
