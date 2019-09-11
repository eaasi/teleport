import AppLogger from '@/logging/appLogger';
import HttpResponseCode from '@/utils/HttpResponseCode';
import { build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';

export default class BaseController {

	protected _logger: AppLogger;

	constructor() {
		this._logger = new AppLogger(this.constructor.name);
	}

	sendError(error: string, response: Response) {
		response.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(error));
	}
}
