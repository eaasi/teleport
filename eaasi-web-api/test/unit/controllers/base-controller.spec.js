import AppLogger from '../../../src/logging/appLogger';
import BaseController from '../../../src/controllers/base/BaseController';

describe('BaseController', () => {
	// Constructor Tests
	it('on initialization creates an AppLogger', () => {
		let sut = new BaseController();
		expect(sut._logger).toBeInstanceOf(AppLogger);
	});
});
