import AppLogger from '@/logging/appLogger';
import CrudQuery from '@/services/base/CrudQuery';
import HttpResponseCode from '@/utils/HttpResponseCode';
import { build_500_response } from '@/utils/error-helpers';
import {Request, Response} from 'express';

export default class BaseController {

	protected _logger: AppLogger;

	constructor() {
		this._logger = new AppLogger(this.constructor.name);
	}

	protected sendError(error: string, response: Response) {
		response.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(error));
	}

	protected _getQueryFromParams(req: Request) {
		let query = new CrudQuery()
		query.limit = req.query.limit || 100;
		query.page = req.query.page || 1;
		query.sortCol = req.query.sortCol;
		query.descending = req.query.descending === 'true';
		return query;
	}
}
