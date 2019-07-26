/**
 * Standard Error Responses for web API Requests
 */

import {NOT_FOUND, SERVER_ERROR} from "./http_helpers";

class ErrorResponse {
	constructor(httpCode, message) {
		this.message = {
			status: httpCode,
			message: message,
		}
	}
}

/**
 * Resource not found response
 * @type {{}}
 */
export function build_404_response(requestedUrl) {

	const message =
		`No resource was not found at the requested location: ${requestedUrl} `;

	return new ErrorResponse(NOT_FOUND, message).message
}

/**
 * Internal server error response
 * @type {{}}
 */
export function build_500_response(serverError) {

	const message = `A Server Error Occurred while processing the request. 
		\n${serverError}`;

	return new ErrorResponse(SERVER_ERROR, message).message
}
