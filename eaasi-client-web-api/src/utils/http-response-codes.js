const OK           = 200   // Successful request
const CREATED      = 201   // The specified resource was created
const ACCEPTED     = 202   // The request was accepted
const REDIRECT     = 302   // "Found" - can be used for redirecting a request
const BAD_REQUEST  = 400   // HTTP request sent to server has invalid syntax
const UNAUTHORIZED = 401   // User trying to access the resource is not authenticated
const FORBIDDEN    = 403   // User made a valid request but is unauthorized to access resource
const NOT_FOUND    = 404   // The requested resource is not found
const SERVER_ERROR = 500   // The server cannot handle the request for an unknown reason

module.exports = {
	OK, CREATED, ACCEPTED, REDIRECT,
	BAD_REQUEST, UNAUTHORIZED, FORBIDDEN,
	NOT_FOUND, SERVER_ERROR,
}