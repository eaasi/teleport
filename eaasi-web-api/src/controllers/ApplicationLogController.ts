import { LOGS_ROOT_PATH } from '@/config/app-config';
import AppLoggerService from '@/services/logger/AppLoggerService';
import { Request, Response } from 'express';
import fs from 'fs';
import BaseController from './base/BaseController';

export default class ApplicationLogController extends BaseController {

	private readonly _appLoggerService: AppLoggerService;

	constructor(appLoggerService = new AppLoggerService()) {
		super();
		this._appLoggerService = appLoggerService;
	}

	async getAll(req: Request, res: Response) {
		try {
			const appLogs = await this._appLoggerService.getAll();
			const sortedAppLogs = appLogs.sort((a, b) => a.id - b.id);
			res.send(sortedAppLogs);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async getAllFromFile(req: Request, res: Response) {
		try {
			let logs = '';
			const arrayOfFiles = fs.readdirSync(LOGS_ROOT_PATH);
			arrayOfFiles.forEach(filePath => {
				let content = fs.readFileSync(`${LOGS_ROOT_PATH}/${filePath}`);
				logs += `###########= ${filePath} =###########
				${content}`;
			})
			res.send(logs);
		} catch(e) {
			this.sendError(e, res);
		}
	}

}