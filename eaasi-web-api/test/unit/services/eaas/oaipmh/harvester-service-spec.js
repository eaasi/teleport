import {MockHttpService} from '../../../../helpers/doubles/mock-http-service';
import HarvesterService from '../../../../../src/services/eaas/oaipmh/HarvesterService';

describe('OAIPMH Harvester Service', () => {

	it('on initialization can assign HtmlService instance via ctor', () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		expect(sut._svc).toBe(httpService);
	});

	it('when getTaskState is called invokes `get` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.getHarvesters();
		expect(httpService.getUrl).toEqual(expect.stringContaining('oaipmh/harvesters'));
	});

	it('when addHarvester is called invokes `post` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.addHarvester();
		expect(httpService.postUrl).toEqual(expect.stringContaining('oaipmh/harvesters'));
	});

	it('when syncHarvester is called invokes `post` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.syncHarvester('some_location');
		expect(httpService.postUrl).toEqual(expect.stringContaining('oaipmh/harvesters/some_location'));
	});

	it('when syncHarvester is called invokes `post` using the IHttpService implementation exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.syncHarvester('some_location');
		expect(httpService.postCount).toEqual(1);
	});

	it('when deleteHarvester is called invokes `delete` using the IHttpService implementation to query the expected URL', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.deleteHarvester('some_location');
		expect(httpService.deleteUrl).toEqual(expect.stringContaining('oaipmh/harvesters/some_location'));
	});

	it('when deleteHarvester is called invokes `delete` using the IHttpService implementation exactly once', async () => {
		let httpService = new MockHttpService();
		let sut = new HarvesterService(httpService);
		sut.deleteHarvester('some_location');
		expect(httpService.deleteCount).toEqual(1);
	});
});
