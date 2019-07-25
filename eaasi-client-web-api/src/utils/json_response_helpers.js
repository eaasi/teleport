/**
 * Standard Error Responses for web API Requests
 */

import {NOT_FOUND} from "./http_helpers";

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
