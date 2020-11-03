import CrudQuery from '@/classes/CrudQuery';
import HttpResponseCode from '@/classes/HttpResponseCode';
import AppLogger from '@/logging/appLogger';
import { IAppLogger } from '@/types/general/log';
import { build_400_response, build_404_response, build_500_response } from '@/utils/error-helpers';
import { Request, Response } from 'express';
import { Result } from 'express-validator';

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

	protected sendNotFound(response: Response) {
		response.status(HttpResponseCode.NOT_FOUND)
			.send(build_404_response())
	}

	protected _getQueryFromParams(req: Request) {
		let query = new CrudQuery();
		query.limit = Number(req.query.limit) || 100;
		query.page = Number(req.query.page) || 1;
		query.sortCol = req.query.sortCol as string;
		query.descending = req.query.descending.toString() === 'true';
		return query;
	}

	/**
	 * Formats an express-validator error message when a malformed request is made
	 * @param req request
	 * @param res response
	 * @param errors express-validator Result errors
	 */
	public async sendMalformedRequestResponse(req: Request, res: Response, errors: Result<any>) {
		let allErrors = errors.array();
		let errorMessage = '';

		for (let i = 0; i < allErrors.length; i++) {

			let thisError = allErrors[i],
				value = thisError.value,
				message = thisError.msg,
				param = thisError.param,
				location = thisError.location;

			errorMessage +=
				`${message}: The value '${value}' for parameter '${param}' cannot be parsed. Location: ${location} `;
		}

		this._logger.log.error(errorMessage);
		res.send(build_400_response(errorMessage));
	}
}
