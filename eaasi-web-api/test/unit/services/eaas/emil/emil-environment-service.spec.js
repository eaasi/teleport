import EmilEnvironmentService from '../../../../../src/services/eaas/emil/EmilEnvironmentService';
import {MockHttpService} from '../../../../helpers/doubles/mock-http-service';

describe('Emil Environment Service', () => {

	it('on initialization can assign HtmlService instance via ctor', () => {
		let httpService = new MockHttpService();
		let sut = new EmilEnvironmentService(httpService);
		expect(sut._svc).toBe(httpService);
	});

	it('throws an error if non-alphanumeric value is passed to getEnvironmentTaskState', async () => {
		let sut = new EmilEnvironmentService();
		try {
			await sut.getEnvironmentTaskState({'foo':'bar'});
			expect(true).toBe(false);
		} catch (e) {
			expect(e).toEqual(expect.stringContaining('taskID must be a string or number.'))
		}
	});

	it('when getEnvironmentTaskState is called invokes `get` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilEnvironmentService(httpService);
		sut.getEnvironmentTaskState(-900_900);
		expect(httpService.getUrl).toEqual(expect.stringContaining('EmilEnvironmentData/taskState?taskId=-900900'));
	});

	it('when getEnvironmentTaskState is called invokes `get` using the IHttpService implementation to query the taskState exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilEnvironmentService(httpService);
		sut.getEnvironmentTaskState(73086);
		expect(httpService.getCount).toEqual(1);
	});

	it('when getNameIndexes is called invokes `get` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilEnvironmentService(httpService);
		sut.getNameIndexes();
		expect(httpService.getUrl).toEqual(expect.stringContaining('EmilEnvironmentData/getNameIndexes'));
	});

	it('when getNameIndexes is called invokes `get` using the IHttpService implementation to query the taskState exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new EmilEnvironmentService(httpService);
		sut.getNameIndexes();
		expect(httpService.getCount).toEqual(1);
	});
});
