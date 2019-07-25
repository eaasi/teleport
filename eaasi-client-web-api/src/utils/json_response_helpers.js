/**
 * Standard Error Responses for web API Requests
 */

import {NOT_FOUND} from "../../dist/http_helpers";

class ErrorResponse {
	constructor(httpCode, message) {
		this.message = {
			status: httpCode,
			message: message
		}
	}
}


/**
 * Resource not found response
 * @type {{}}
 */
function build_404_response(resource_name) {
	const message =
		`The resource ${resource_name} was not found at this location.`;
	return new ErrorResponse(NOT_FOUND, message).message
}
