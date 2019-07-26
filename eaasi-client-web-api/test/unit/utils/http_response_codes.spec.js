import {OK, ACCEPTED, REDIRECT, BAD_REQUEST,
	NOT_FOUND, SERVER_ERROR, CREATED, FORBIDDEN,
	UNAUTHORIZED} from "../../../src/utils/http_response_codes";

describe('The response code', () => {
	it("for 'OK' should be 200", () => {
		const okCode = OK
		expect(200).toBe(okCode)
	});

	it("for 'CREATED' should be 201", () => {
		const okCode = OK
		expect(200).toBe(okCode)
	});

	it("for 'ACCEPTED' should be 202", () => {
		const acceptedCode = ACCEPTED
		expect(202).toBe(acceptedCode)
	});

	it("for 'REDIRECT' should be 302", () => {
		const rdCode = REDIRECT
		expect(302).toBe(rdCode)
	});

	it("for 'BAD_REQUEST' should be 400", () => {
		const badRequestCode = BAD_REQUEST
		expect(400).toBe(badRequestCode)
	});

	it("for 'UNAUTHORIZED' should be 401", () => {
		const unauthorized = UNAUTHORIZED
		expect(401).toBe(unauthorized)
	});

	it("for 'FORBIDDEN' should be 403", () => {
		const forbiddenCode = FORBIDDEN
		expect(403).toBe(forbiddenCode)
	});

	it("for 'NOT_FOUND' should be 404", () => {
		const notFoundCode = NOT_FOUND
		expect(404).toBe(notFoundCode)
	});

	it("for 'SERVER_ERROR' should be 500", () => {
		const serverErrorCode = SERVER_ERROR
		expect(500).toBe(serverErrorCode)
	});
})