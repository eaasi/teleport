import AppLoggerService from '@/services/logger/AppLoggerService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

export default class ApplicationLogController extends BaseController {

	private readonly _appLoggerService: AppLoggerService;

	constructor(appLoggerService = new AppLoggerService()) {
		super();
		this._appLoggerService = appLoggerService;
	}

	async getAll(req: Request, res: Response) {
		try {
			const result = await this._appLoggerService.getAll();
			res.send(result);
		} catch(e) {
			this._logger.log.error(e);
			return this.sendError(e.message, res);
		}
	}
}
