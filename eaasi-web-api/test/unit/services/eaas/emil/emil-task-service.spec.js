import {MockHttpService} from '../../../../helpers/doubles/mock-http-service';
import EmilTaskService from '../../../../../src/services/task/EmilTaskService';

describe('Emil Container Service', () => {

	it('on initialization can assign HtmlService instance via ctor', () => {
		let httpService = new MockHttpService();
		let sut = new EmilTaskService(httpService);
		expect(sut._svc).toBe(httpService);
	});

	it('throws an error if non-alphanumeric value is passed to getEnvironmentTaskState', async () => {
		let sut = new EmilTaskService();
		try {
			await sut.getTaskState({'foo':'bar'});
			expect(true).toBe(false);
		} catch (e) {
			expect(e).toEqual(expect.stringContaining('taskId must be a string or number. Received'))
		}
	});

	it('throws an error if empty value is passed to getEnvironmentTaskState', async () => {
		let sut = new EmilTaskService();
		try {
			await sut.getTaskState(null);
			expect(true).toBe(false);
		} catch (e) {
			expect(e).toEqual('taskId must not be empty')
		}
	});

	it('when getTaskState is called invokes `get` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilTaskService(httpService);
		sut.getTaskState(-29348);
		expect(httpService.getUrl).toEqual(expect.stringContaining('-29348'));
	});

	it('when getTaskState is called invokes `get` using the IHttpService implementation to query the taskState exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilTaskService(httpService);
		sut.getTaskState(19);
		expect(httpService.getCount).toEqual(1);
	});
});
