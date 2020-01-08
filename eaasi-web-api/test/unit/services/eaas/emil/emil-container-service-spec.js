import {MockHttpService} from '../../../../helpers/doubles/mock-http-service';
import EmilContainerService from '../../../../../src/services/eaas/emil/EmilContainerService';

describe('Emil Container Service', () => {

	it('on initialization can assign HtmlService instance via ctor', () => {
		let httpService = new MockHttpService();
		let sut = new EmilContainerService(httpService);
		expect(sut._svc).toBe(httpService);
	});

	it('throws an error if non-alphanumeric value is passed to getEnvironmentTaskState', async () => {
		let sut = new EmilContainerService();
		try {
			await sut.getTaskState({'foo':'bar'});
			expect(true).toBe(false);
		} catch (e) {
			expect(e).toEqual(expect.stringContaining('taskId must be a string or number. Received'))
		}
	});

	it('when getTaskState is called invokes `get` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilContainerService(httpService);
		sut.getTaskState(-29348);
		expect(httpService.getUrl).toEqual(expect.stringContaining('emil/tasks/-29348'));
	});

	it('when getTaskState is called invokes `get` using the IHttpService implementation to query the taskState exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilContainerService(httpService);
		sut.getTaskState(19);
		expect(httpService.getCount).toEqual(1);
	});
});
