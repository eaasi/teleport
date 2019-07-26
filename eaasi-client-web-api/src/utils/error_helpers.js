/**
 * Standard Error Responses for web API Requests
 */

import {BAD_REQUEST, NOT_FOUND, SERVER_ERROR} from "./http_helpers";

/**
 * Provides a common message response object
 */
class ErrorResponse {
	constructor(httpCode, detail) {
		this.message = {
			hasError: true,
			status: httpCode,
			message: detail,
		}
	}
}

/**
 * Malformed request error response
 * @type {{}}
 */
export function build_400_response(requestBody) {
	const messageDetail = `The provided request format is invalid: ${requestBody}`;
	return new ErrorResponse(BAD_REQUEST, messageDetail).message
}

/**
 * HTTP "Unauthorized" error response (Requester is not authenticated)
 * @type {{}}
 */
export function build_401_response() {
	const messageDetail = `You need to be authenticated to access the requested resource`;

	return new ErrorResponse(NOT_FOUND, messageDetail).message
}

/**
 * HTTP "Forbidden" error response  (Requester is not authorized)
 * @type {{}}
 */
export function build_403_response() {
	const messageDetail = `You do not have permission to access the requested resource`;

	return new ErrorResponse(NOT_FOUND, messageDetail).message
}

/**
 * Resource not found response
 * @type {{}}
 */
export function build_404_response(requestedUrl) {
	const messageDetail =
		`No resource was not found at the requested location: ${requestedUrl}`;

	return new ErrorResponse(NOT_FOUND, messageDetail).message
}

/**
 * Internal server error response
 * @type {{}}
 */
export function build_500_response(serverError) {
	let standardizedError = _getStandardizedServerError(serverError.name);

	const messageDetail =
		`A server error occurred while processing the request: ${standardizedError}`;

	return new ErrorResponse(SERVER_ERROR, messageDetail).message
}

/**
 * Builds a standardized error payload based on the message returned from the server.
 * @param errorName the error type returned from the server
 * @returns {*|string}
 */
export function _getStandardizedServerError(errorName) {
	let messageMap = {
		'SequelizeDatabaseError': "Server could not parse the provided query"
	}

	return messageMap[errorName] || "Unspecified server error"
}
