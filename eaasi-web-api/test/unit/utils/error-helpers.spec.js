import {
	build_400_response,
	build_401_response,
	build_403_response,
	build_404_response, build_500_response
} from '../../../src/utils/error-helpers';
import ErrorResponse from '@/classes/ErrorResponse';

describe('build_400_response', () => {
	it('returns an ErrorResponse object', () => {
		const fakeRequestBody = 'some error';
		let result = build_400_response(fakeRequestBody);
		expect(result).toBeInstanceOf(ErrorResponse);
	});

	it('specifies a message showing the malformed request', () => {
		const fakeRequestBody = 'some error';
		let result = build_400_response(fakeRequestBody);
		expect(result.message).toBe(
			'The provided request format is invalid: some error'
		);
	});

	it('provides an ErrorResponse with HTTP status code 400', () => {
		const fakeRequestBody = 'some error';
		let result = build_400_response(fakeRequestBody);
		expect(result.status).toBe(400);
	});
});

describe('build_401_response', () => {
	it('returns an ErrorResponse object', () => {
		let result = build_401_response();
		expect(result).toBeInstanceOf(ErrorResponse);
	});

	it('specifies a message that shows the requesting client is not authenticated', () => {
		let result = build_401_response();
		expect(result.message).toBe(
			'You need to be authenticated to access the requested resource'
		);
	});

	it('provides an ErrorResponse with HTTP status code 401', () => {
		let result = build_401_response();
		expect(result.status).toBe(401);
	});
});

describe('build_403_response', () => {
	it('returns an ErrorResponse object', () => {
		let result = build_403_response();
		expect(result).toBeInstanceOf(ErrorResponse);
	});

	it('specifies a message that shows the requesting client is forbidden from accessing resource', () => {
		let result = build_403_response();
		expect(result.message).toBe(
			'You do not have permission to access the requested resource'
		);
	});

	it('provides an ErrorResponse with HTTP status code 403', () => {
		let result = build_403_response();
		expect(result.status).toBe(403);
	});
});

describe('build_404_response', () => {
	it('returns an ErrorResponse object', () => {
		const fakeUrl = '/foo/bar/';
		let result = build_404_response(fakeUrl);
		expect(result).toBeInstanceOf(ErrorResponse);
	});

	it('specifies a message showing that the resource was not found', () => {
		const fakeUrl = '/foo/bar/';
		let result = build_404_response(fakeUrl);
		expect(result.message).toBe(
			`Resource was not found at the requested location: ${fakeUrl}`
		);
	});

	it('provides an ErrorResponse with HTTP status code 404', () => {
		const fakeUrl = '/foo/bar/';
		let result = build_404_response(fakeUrl);
		expect(result.status).toBe(404);
	});
});

describe('build_500_response', () => {
	it('returns an ErrorResponse object', () => {
		const fakeServerError = new Error('meltdown!');
		let result = build_500_response(fakeServerError);
		expect(result).toBeInstanceOf(ErrorResponse);
	});

	it('in production mode, provides "Unspecified server error" for an unmapped error type', () => {
		const original_env = process.env.NODE_ENV
		process.env.NODE_ENV = 'production'
		const fakeServerError = new Error('meltdown!');
		let result = build_500_response(fakeServerError);
		expect(result.message).toBe(
			'A server error occurred while processing the request: Unspecified server error'
		);
		process.env.NODE_ENV = original_env
	});

	it('in production mode, provides "Server could not parse the provided query" for a SequelizeDatabaseError', () => {
		const original_env = process.env.NODE_ENV
		process.env.NODE_ENV = 'production'
		let fakeServerError = { name : 'SequelizeDatabaseError', message : 'some bad error'};
		let result = build_500_response(fakeServerError);
		expect(result.message).toBe(
			'A server error occurred while processing the request: Server could not parse the provided query'
		);
		process.env.NODE_ENV = original_env
	});

	it('in development mode, provides full error object for an arbitrary error', () => {
		const original_env = process.env.NODE_ENV
		process.env.NODE_ENV = 'development'
		const errorMsg = 'The servers melted';
		const fakeServerError = new Error(errorMsg);
		let result = build_500_response(fakeServerError);
		expect(result.message).toBe(errorMsg);
		process.env.NODE_ENV = original_env
	});

	it('in test mode, provides full error object for an arbitrary error', () => {
		const original_env = process.env.NODE_ENV
		const errorMsg = 'All the tests are broken';
		process.env.NODE_ENV = 'test'
		const fakeServerError = new Error(errorMsg);
		let result = build_500_response(fakeServerError);
		expect(result.message).toBe(errorMsg);
		process.env.NODE_ENV = original_env
	});

	it('in local mode, provides full error object for an arbitrary error', () => {
		const original_env = process.env.NODE_ENV
		const errorMsg = 'Your laptop melted';
		process.env.NODE_ENV = 'local'
		const fakeServerError = new Error(errorMsg);
		let result = build_500_response(fakeServerError);
		expect(result.message).toBe(errorMsg);
		process.env.NODE_ENV = original_env
	});

	it('provides an ErrorResponse with HTTP status code 500', () => {
		const fakeServerError = { name: 'SequelizeDatabaseError' };
		let result = build_500_response(fakeServerError);
		expect(result.status).toBe(500);
	});
});
