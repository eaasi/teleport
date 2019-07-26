import {
	build_400_response,
	build_401_response,
	build_403_response, build_404_response, build_500_response,
	ErrorResponse
} from "../../../src/utils/error_helpers";

describe('build_400_response', () => {
	it('should return an ErrorResponse object', () => {
		const fakeRequestBody = "some error"
		let result = build_400_response(fakeRequestBody)
		expect(result).toBeInstanceOf(ErrorResponse)
	});

	it('should specify a message showing the malformed request', () => {
		const fakeRequestBody = "some error"
		let result = build_400_response(fakeRequestBody)
		expect(result.message).toBe("The provided request format is invalid: some error")
	});

	it('should provide an ErrorResponse with HTTP status code 400', () => {
		const fakeRequestBody = "some error"
		let result = build_400_response(fakeRequestBody)
		expect(result.status).toBe(400)
	});
})

describe('build_401_response', () => {
	it('should return an ErrorResponse object', () => {
		let result = build_401_response()
		expect(result).toBeInstanceOf(ErrorResponse)
	});

	it('should specify a message that shows the requesting client is not authenticated', () => {
		let result = build_401_response()
		expect(result.message).toBe("You need to be authenticated to access the requested resource")
	});

	it('should provide an ErrorResponse with HTTP status code 401', () => {
		let result = build_401_response()
		expect(result.status).toBe(401)
	});
})

describe('build_403_response', () => {
	it('should return an ErrorResponse object', () => {
		let result = build_403_response()
		expect(result).toBeInstanceOf(ErrorResponse)
	});

	it('should specify a message that shows the requesting client is forbidden from accessing resource', () => {
		let result = build_403_response()
		expect(result.message).toBe("You do not have permission to access the requested resource")
	});

	it('should provide an ErrorResponse with HTTP status code 403', () => {
		let result = build_403_response()
		expect(result.status).toBe(403)
	});
})

describe('build_404_response', () => {
	it('should return an ErrorResponse object', () => {
		const fakeUrl = "/foo/bar/"
		let result = build_404_response(fakeUrl)
		expect(result).toBeInstanceOf(ErrorResponse)
	});

	it('should specify a message showing that the resource was not found', () => {
		const fakeUrl = "/foo/bar/"
		let result = build_404_response(fakeUrl)
		expect(result.message).toBe(`Resource was not found at the requested location: ${fakeUrl}`)
	});

	it('should provide an ErrorResponse with HTTP status code 404', () => {
		const fakeUrl = "/foo/bar/"
		let result = build_404_response(fakeUrl)
		expect(result.status).toBe(404)
	});
})

describe('build_500_response', () => {
	it('should return an ErrorResponse object', () => {
		const fakeServerError = {name: "meltdown!"}
		let result = build_500_response(fakeServerError)
		expect(result).toBeInstanceOf(ErrorResponse)
	});

	it('should provide "Unspecified server error" for an unmapped error type', () => {
		const fakeServerError = {name: "meltdown!"}
		let result = build_500_response(fakeServerError)
		expect(result.message).toBe("A server error occurred while processing the request: Unspecified server error")
	});

	it('should provide "Server could not parse the provided query" for a SequelizeDatabaseError', () => {
		const fakeServerError = {name: "SequelizeDatabaseError"}
		let result = build_500_response(fakeServerError)
		expect(result.message).toBe("A server error occurred while processing the request: Server could not parse the provided query")
	});

	it('should provide an ErrorResponse with HTTP status code 500', () => {
		const fakeServerError = {name: "SequelizeDatabaseError"}
		let result = build_500_response(fakeServerError)
		expect(result.status).toBe(500)
	});
})
