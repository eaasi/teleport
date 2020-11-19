import { AppLogger } from '../../../src/logging/appLogger';
import BaseController from '../../../src/controllers/base/BaseController';
import HttpResponseCode from '@/classes/HttpResponseCode';
import {mockRequest, mockResponse} from '../../helpers/doubles/express-doubles';
import CrudQuery from '../../../src/classes/CrudQuery';

describe('BaseController', () => {
	// Constructor Tests
	it('on initialization creates an AppLogger', () => {
		let sut = new BaseController();
		expect(sut._logger).toBeInstanceOf(AppLogger);
	});

	it('on sendClientError sets a status of 400', async () => {
		let sut = new BaseController();
		const res = mockResponse();
		await sut.sendClientError(new Error('hello world'), res);
		expect(res.status).toHaveBeenCalledWith(HttpResponseCode.BAD_REQUEST);
	});

	it('on sendClientError sends a 400 response with the provided error', async () => {
		let sut = new BaseController();
		const res = mockResponse();
		await sut.sendClientError(new Error('another prob'), res);
		expect(res.send).toHaveBeenCalledWith(
			{
				'hasError': true,
				'message': 'The provided request format is invalid: another prob',
				'status': 400
			}
		);
	});

	it('on sendError sets a status of 500', async () => {
		let sut = new BaseController();
		const res = mockResponse();
		await sut.sendError(new Error('burned'), res);
		expect(res.status).toHaveBeenCalledWith(HttpResponseCode.SERVER_ERROR);
	});

	it('on sendError sends a 500 response with the provided error', async () => {
		let sut = new BaseController();
		const res = mockResponse();
		await sut.sendError(new Error('its a trap!'), res);
		expect(res.send).toHaveBeenCalledWith(
			{
				'hasError': true,
				'message': 'its a trap!',
				'status': 500
			}
		);
	});

	it('on _getQueryFromParams sets query params based on request query object', async () => {
		let sut = new BaseController();
		const req = mockRequest();

		req.query.limit = 1234;
		req.query.page = 23;
		req.query.sortCol = 'foo';
		req.query.descending = true;

		let query = sut._getQueryFromParams(req);

		let expected = new CrudQuery();
		expected.limit = 1234;
		expected.page = 23;
		expected.sortCol = 'foo';
		expected.descending = true;

		expect(query).toStrictEqual(expected)
	});
});
