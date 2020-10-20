import AppLogger from '@/logging/appLogger';
import CrudQuery from '@/services/base/CrudQuery';
import { build_400_response, build_500_response } from '@/utils/error-helpers';
import { Request, Response } from 'express';
import { IAppLogger } from '@/types/general/log';
import HttpResponseCode from '@/classes/HttpResponseCode';

export default class BaseController {

	protected _logger: IAppLogger;

	constructor() {
		this._logger = AppLogger;
	}

	protected sendClientError(error: Error | string, response: Response) {
		if(typeof error === 'string') {
			error = new Error(error);
		}
		this._logger.log.error(error.stack);
		response.status(HttpResponseCode.BAD_REQUEST)
			.send(build_400_response(error.message));
	}

	protected sendError(error: Error | string, response: Response) {
		if(typeof error === 'string') {
			error = new Error(error);
		}
		this._logger.log.error(error.stack);
		response.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(error));
	}

	protected _getQueryFromParams(req: Request) {
		let query = new CrudQuery();
		query.limit = req.query.limit || 100;
		query.page = req.query.page || 1;
		query.sortCol = req.query.sortCol;
		query.descending = req.query.descending.toString() === 'true';
		return query;
	}
}
