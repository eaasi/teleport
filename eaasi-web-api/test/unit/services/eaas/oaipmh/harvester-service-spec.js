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
});
