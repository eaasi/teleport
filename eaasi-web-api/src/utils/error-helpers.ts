/**
 * Standard Error Responses for web API Requests
 */

import ErrorResponse from './ErrorResponse';
import HttpResponseCode from './HttpResponseCode';

/**
 * Provides a common message response object
 */

/**
 * Malformed request error response
 * @type {{}}
 */
export function build_400_response(requestBody: string) {
	const messageDetail = `The provided request format is invalid: ${requestBody}`;
	return new ErrorResponse(HttpResponseCode.BAD_REQUEST, messageDetail);
}

/**
 * HTTP "Unauthorized" error response (Requester is not authenticated)
 * @type {{}}
 */
export function build_401_response() {
	const messageDetail = 'You need to be authenticated to access the requested resource';
	return new ErrorResponse(HttpResponseCode.UNAUTHORIZED, messageDetail);

}

/**
 * HTTP "Forbidden" error response  (Requester is not authorized)
 * @type {{}}
 */
export function build_403_response() {
	const messageDetail = 'You do not have permission to access the requested resource';
	return new ErrorResponse(HttpResponseCode.FORBIDDEN, messageDetail);
}

/**
 * Resource not found response
 * @type {{}}
 */
export function build_404_response(requestedUrl: string) {
	const messageDetail =
		`Resource was not found at the requested location: ${requestedUrl}`;
	return new ErrorResponse(HttpResponseCode.NOT_FOUND, messageDetail);
}


/**
 * Builds a standardized error payload based on the message returned from the server.
 * @param errorName the error type returned from the server
 * @returns {*|string}
 */
export function _getStandardizedServerError(errorName: string): string {
	if (errorName === 'SequelizeDatabaseError'){
		return 'Server could not parse the provided query';
	}
	return 'Unspecified server error';
}

/**
 * Internal server error response
 * @type {{}}
 */
export function build_500_response(serverError: Error) {
	const nodeEnvironment = process.env.NODE_ENV || '';

	if(['test', 'development', 'local'].includes(nodeEnvironment)) {
		return new ErrorResponse(HttpResponseCode.SERVER_ERROR, serverError.message);
	}
	let errorName = serverError.name ? serverError.name : 'Unspecified error';
	let error = _getStandardizedServerError(errorName);
	const messageDetail =
		`A server error occurred while processing the request: ${error}`;
	return new ErrorResponse(HttpResponseCode.SERVER_ERROR, messageDetail);
}
