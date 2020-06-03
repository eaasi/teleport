import { MockHttpService } from '../../../helpers/doubles/mock-http-service';
import SoftwareService from '../../../../src/services/resource/SoftwareService';

describe('SoftwareService', () => {

	it('on getSoftwareObjectId calls get on software service with expected query params', () => {
		let mockSoftwareRepoService = new MockHttpService();
		let sut = new SoftwareService(mockSoftwareRepoService);
		sut.getSoftwarePackage('baz');
		expect(mockSoftwareRepoService.getUrl).toStrictEqual('packages/baz');
	});

	it('on getSoftwarePackageDescription calls get on software service with expected query params', () => {
		let mockSoftwareRepoService = new MockHttpService();
		let sut = new SoftwareService(mockSoftwareRepoService);
		sut.getSoftwareDescription('crux');
		expect(mockSoftwareRepoService.getUrl).toStrictEqual('descriptions/crux');
	});
	
})
