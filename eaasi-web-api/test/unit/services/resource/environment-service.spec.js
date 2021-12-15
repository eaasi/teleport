import { MockHttpService } from '../../../helpers/doubles/mock-http-service';
import EnvironmentService from '../../../../src/services/resource/EnvironmentService';
import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import { MockBaseService } from '../../../helpers/doubles/mock-base-service';

describe('EnvironmentService', () => {

	// Constructor Tests
	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let sut = new EnvironmentService(mockEnvironmentRepoService);
		expect(sut._environmentRepoService).toBe(mockEnvironmentRepoService);
	});

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		expect(sut._componentService).toBe(mockComponentService);
	});

	it('on getEnvironment calls get on environment service', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.getEnvironment('foo');
		expect(mockEnvironmentRepoService.getUrl).toBe('environments/foo');
	});

	it('on replicateEnvironment calls post on environment service with replcateImage', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		const replicateRequest = new ReplicateEnvironmentRequest({
			destArchive: 'public',
			replicateList: ['foo']
		});
		sut.replicateEnvironment(replicateRequest);
		expect(mockEnvironmentRepoService.postData).toStrictEqual(replicateRequest);
	});

	it('on replicateEnvironment calls post on environment service with replicateImage', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		const replicateRequest = new ReplicateEnvironmentRequest({
			destArchive: 'public',
			replicateList: ['foo']
		});
		sut.replicateEnvironment(replicateRequest);
		expect(mockEnvironmentRepoService.postData).toStrictEqual(replicateRequest);
		expect(mockEnvironmentRepoService.postUrl).toStrictEqual('actions/replicate-image');
	});

	it('on deleteEnvironment calls post (!) on environment service with delete payload', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.deleteEnvironment('foo');
		expect(mockEnvironmentRepoService.deleteData).toStrictEqual(
			{
				'deleteImage': true,
				'deleteMetaData': true,
				'envId': 'foo',
				'force': true,
			}
		);
	});

	it('on deleteEnvironment calls post (!) on environment service with path delete', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.deleteEnvironment('ufo');
		expect(mockEnvironmentRepoService.deleteUrl).toStrictEqual('environments/ufo');
	});

	it('on getTemplates calls EnvSvc get => getTemplates', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.getTemplates();
		expect(mockEnvironmentRepoService.getUrl).toStrictEqual('templates');
	});

	it('on getPatches calls EnvSvc get => getTemplates', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.getPatches();
		expect(mockEnvironmentRepoService.getUrl).toStrictEqual('patches');
	});

	it('on getOperatingSystemMetadata calls EnvSvc get => getOperatingSystemMetadata', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService);
		sut.getOperatingSystemMetadata();
		expect(mockEnvironmentRepoService.getUrl).toStrictEqual('os-metadata');
	});

	it('on getEmulators calls getEmulators', () => {
		let mockEnvironmentRepoService = new MockHttpService();
		let mockEmulatorRepoService = new MockHttpService();
		let mockComponentService = new MockBaseService();
		let sut = new EnvironmentService(mockEnvironmentRepoService, mockComponentService, mockEmulatorRepoService);
		sut.getEmulators();
		expect(mockEmulatorRepoService.getUrl).toStrictEqual('emulators');
	});

})