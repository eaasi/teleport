import {
	build_400_response,
	build_401_response,
	build_403_response,
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
