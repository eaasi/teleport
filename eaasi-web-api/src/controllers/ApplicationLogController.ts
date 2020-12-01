import { LOGS_ROOT_PATH } from '@/config/app-config';
import AppLoggerService from '@/services/logger/AppLoggerService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { IApplicationLog } from '@/types/general/log';
import { Request, Response } from 'express';
import fs from 'fs';
import { Readable } from 'stream';
import zlib from 'zlib';
import BaseController from './base/BaseController';

export default class ApplicationLogController extends BaseController {

	private readonly _appLoggerService: AppLoggerService;

	constructor(appLoggerService = new AppLoggerService()) {
		super();
		this._appLoggerService = appLoggerService;
	}

	async getAll(req: Request, res: Response) {
		try {
			const logs = await this.getAllFromDB();
			res.send(logs);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async getAllFromFile(req: Request, res: Response) {
		try {
			let logs = this.getLogsFromFile();
			if (!logs) {
				logs = await this.getAllFromDB();
			}
			res.send(logs);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getMostRecent(req: Request, res: Response) {
		try {
			const appLogs = await this._appLoggerService.getMostRecent();
			res.send(appLogs);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async downloadAllFromFile(req: IAuthorizedGetRequest, res: Response) {
		try {
			let logs = await this.getAllFromDB();
			if (!logs || !logs.length) logs = this.getLogsFromFile();
			let gzip = zlib.createGzip();
			let r = new Readable();
			r.push(logs);
			r.push(null);
			res.setHeader('Content-Disposition', 'attachment; filename=eaasi-webapi-error-report.gz');
			r.pipe(gzip).pipe(res);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	protected getLogsFromFile(): string {
		let logs = '';
		const arrayOfFiles = fs.readdirSync(LOGS_ROOT_PATH);
		arrayOfFiles.forEach(filePath => {
			let content = fs.readFileSync(`${LOGS_ROOT_PATH}/${filePath}`);
			logs += `###########= ${filePath} =###########
			${content}`;
		});
		return logs;
	}

	protected async getAllFromDB(): Promise<string> {
		const appLogs = await this._appLoggerService.getAll();
		if (!appLogs || appLogs.length) return '';
		const formattedLogs = this.formatLogs(appLogs.sort((a, b) => a.id - b.id))
		return JSON.stringify(formattedLogs);
	}

	private formatLogs(logs: IApplicationLog[]): string[] {
		return logs.map(log => `${log.level}: ${log.message}`);
	}

}