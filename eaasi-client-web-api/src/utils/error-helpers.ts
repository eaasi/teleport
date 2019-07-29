/**
 * Standard Error Responses for web API Requests
 */

import {BAD_REQUEST, FORBIDDEN, NOT_FOUND, SERVER_ERROR, UNAUTHORIZED} from "./http-response-codes";

interface IErrorResponse {
	hasError: boolean,
	status: number,
	message: string
}

/**
 * Provides a common message response object
 */
export class ErrorResponse implements IErrorResponse {
	constructor(httpStatusCode: number, message: string) {
		this.hasError = true;
		this.status = httpStatusCode;
		this.message = message;
	}

	hasError: boolean;
	message: string;
	status: number;
}

/**
 * Malformed request error response
 * @type {{}}
 */
export function build_400_response(requestBody: string) {
	const messageDetail = `The provided request format is invalid: ${requestBody}`;
	return new ErrorResponse(BAD_REQUEST, messageDetail)
}

/**
 * HTTP "Unauthorized" error response (Requester is not authenticated)
 * @type {{}}
 */
export function build_401_response() {
	const messageDetail = `You need to be authenticated to access the requested resource`;
	return new ErrorResponse(UNAUTHORIZED, messageDetail)

}

/**
 * HTTP "Forbidden" error response  (Requester is not authorized)
 * @type {{}}
 */
export function build_403_response() {
	const messageDetail = `You do not have permission to access the requested resource`;
	return new ErrorResponse(FORBIDDEN, messageDetail)
}

/**
 * Resource not found response
 * @type {{}}
 */
export function build_404_response(requestedUrl: string) {
	const messageDetail =
		`Resource was not found at the requested location: ${requestedUrl}`;
	return new ErrorResponse(NOT_FOUND, messageDetail)
}

/**
 * Internal server error response
 * @type {{}}
 */
export function build_500_response(serverError: any) {
	let standardizedError = _getStandardizedServerError(serverError.name);
	const messageDetail =
		`A server error occurred while processing the request: ${standardizedError}`;
	return new ErrorResponse(SERVER_ERROR, messageDetail)
}

/**
 * Builds a standardized error payload based on the message returned from the server.
 * @param errorName the error type returned from the server
 * @returns {*|string}
 */
export function _getStandardizedServerError(errorName: string) :string {
	if (errorName === "SequelizeDatabaseError"){
		return "Server could not parse the provided query"
	}

	return "Unspecified server error"
}
