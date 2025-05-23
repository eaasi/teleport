import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import HttpResponseCode from '@/classes/HttpResponseCode';

/**
 * Handle XHR Errors
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next
 */
export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
	if (req.xhr) {
		let { name, message, stack } = err;
		res.status(500).send({
			name,
			message,
			stack
		});
	} else {
		next(err);
	}
}

/**
 * Final Error Handler, renders error Page if 500 response
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next Next
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || HttpResponseCode.SERVER_ERROR);
	res.render('error');
}

/**
 * 404 Error Handler
 * @param req Request
 * @param res Response
 * @param next Next
 */
export function notFoundHandler(err: any, req: Request, res: Response, next: NextFunction) {
	next(createError(HttpResponseCode.NOT_FOUND));
}
