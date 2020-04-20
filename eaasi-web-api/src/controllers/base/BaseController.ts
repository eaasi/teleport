import AppLogger from '@/logging/appLogger';
import CrudQuery from '@/services/base/CrudQuery';
import { build_400_response, build_500_response } from '@/utils/error-helpers';
import HttpResponseCode from '@/utils/HttpResponseCode';
import { Request, Response } from 'express';

export default class BaseController {

	protected _logger: AppLogger;

	constructor() {
		this._logger = new AppLogger(this.constructor.name);
	}

	protected sendClientError(error: Error, response: Response) {
		this._logger.log.error(error.stack);
		response.status(HttpResponseCode.BAD_REQUEST)
			.send(build_400_response(error.message));
	}

	protected sendError(error: Error, response: Response) {
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
