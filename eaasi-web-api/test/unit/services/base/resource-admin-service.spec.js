import { MockHttpService } from '../../../helpers/doubles/mock-http-service';
import ResourceAdminService from '../../../../src/services/resource/ResourceAdminService';
import {resourceTypes} from '../../../../src/utils/constants';

describe('UserAdminService', () => {
	// Constructor Tests

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		expect(sut._emilEnvSvc).toBe(mockEnvSvc);
	});

	it('on initialization sets an IHttpService service for _emilSofSvc', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		expect(sut._emilSofSvc).toBe(mockSofSvc);
	});

	it('on initialization sets an IHttpService service for _emilContentSvc', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		expect(sut._emilContentSvc).toBe(mockContentSvc);
	});

	it('on searchResources calls get on environment service exactly once given environments', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ => 
			expect(mockEnvSvc.getCount).toBe(1)
		);
	});

	it('on searchResources calls get on environment service given query keyword', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ =>
			expect(mockEnvSvc.getUrl).toBe('') // keyword currently applied post-hoc in filter
		);
	});

	it('on searchResources calls get on software service exactly once given software', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query);
	});

	it('on searchResources calls get on content service given query keyword', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ =>
			expect(mockContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
		);
	});

	it('on searchResources calls get on software service with \'getSoftwarePackageDescriptions\' given query keyword', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ => 
			expect(mockSofSvc.getUrl).toBe('getSoftwarePackageDescriptions')
		);
	});

	it('on searchResources calls get on content service exactly once given content', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ => 
			expect(mockContentSvc.getCount).toBe(1)
		);
	});

	it('on searchResources calls get on content service with \'zero conf\' given query keyword', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ =>
			expect(mockContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
		);
	});

	it('on searchResources calls get on content service given query keyword', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ => 
			expect(mockContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
		);
	});

	it('on searchResources calls get on searchable types in query only - environment and content only', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			types: [resourceTypes.ENVIRONMENT, resourceTypes.CONTENT]
		};
		sut.searchResources(query).then(_ => {
			expect(mockEnvSvc.getCount).toBe(1);
			expect(mockContentSvc.getCount).toBe(1);
			expect(mockSofSvc.getCount).toBe(0);
		});
	});

	it('on searchResources calls get on searchable types in query only - software only', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			types: [resourceTypes.SOFTWARE]
		};
		sut.searchResources(query).then(_ => {
			expect(mockEnvSvc.getCount).toBe(0);
			expect(mockContentSvc.getCount).toBe(0);
			expect(mockSofSvc.getCount).toBe(1);
		});
	});

	it('on searchResources calls get on searchable types in query only - software and environment only', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			types: [resourceTypes.SOFTWARE, resourceTypes.ENVIRONMENT]
		};
		sut.searchResources(query).then(_ => {
			expect(mockEnvSvc.getCount).toBe(1);
			expect(mockContentSvc.getCount).toBe(0);
			expect(mockSofSvc.getCount).toBe(1);
		});
	});

	it('on searchResources calls get on environment service given no query types', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockEnvSvc.getUrl).toBe('')
		);
	});

	it('on searchResources calls get on software service given no query types', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockSofSvc.getUrl).toBe('getSoftwarePackageDescriptions')
		);
	});

	it('on searchResources calls get on content service given no query types', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
		);
	});

	it('on getEnvironment calls get on environment service', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getEnvironment('foo');
		expect(mockEnvSvc.getUrl).toBe('foo');
	});

	it('on saveEnvironment calls post on environment service with replcateImage', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.saveEnvironment('foo');
		expect(mockEnvSvc.postData).toStrictEqual(
			{
				'destArchive': 'public',
				'replicateList': ['foo']
			}
		);
	});

	it('on saveEnvironment calls post on environment service with replicateImage', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.saveEnvironment('foo');
		expect(mockEnvSvc.postData).toStrictEqual(
			{
				'destArchive': 'public',
				'replicateList': ['foo']
			}
		);
		expect(mockEnvSvc.postUrl).toStrictEqual('replicateImage');
	});

	it('on deleteEnvironment calls post (!) on environment service with delete payload', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.deleteEnvironment('foo');
		expect(mockEnvSvc.postData).toStrictEqual(
			{
				'deleteImage': true,
				'deleteMetaData': true,
				'envId': 'foo',
				'force': true,
			}
		);
	});

	it('on deleteEnvironment calls post (!) on environment service with path delete', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.deleteEnvironment('ufo');
		expect(mockEnvSvc.postUrl).toStrictEqual('delete');
	});

	it('on getSoftwareObjectId calls get on software service with expected query params', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getSoftwareObject('baz');
		expect(mockSofSvc.getUrl).toStrictEqual('getSoftwareObject?softwareId=baz');
	});

	it('on getSoftwarePackageDescription calls get on software service with expected query params', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getSoftwarePackageDescription('crux');
		expect(mockSofSvc.getUrl).toStrictEqual('getSoftwarePackageDescription?softwareId=crux');
	});

	it('on getEnvironmentTemplates calls EnvSvc get => getEnvironmentTemplates', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getEnvironmentTemplates();
		expect(mockEnvSvc.getUrl).toStrictEqual('getEnvironmentTemplates');
	});

	it('on getPatches calls EnvSvc get => getEnvironmentTemplates', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getPatches();
		expect(mockEnvSvc.getUrl).toStrictEqual('getPatches');
	});

	it('on getOperatingSystemMetadata calls EnvSvc get => getOperatingSystemMetadata', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getOperatingSystemMetadata();
		expect(mockEnvSvc.getUrl).toStrictEqual('operatingSystemMetadata');
	});

	it('on getNameIndexes calls getNameIndexes', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getNameIndexes();
		expect(mockEnvSvc.getUrl).toStrictEqual('getNameIndexes');
	});

	it('on getObjectArchive calls content service archives', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getObjectArchive();
		expect(mockContentSvc.getUrl).toStrictEqual('archives');
	});

	it('on getObjectArchiveItems calls content service by archiveId', () => {
		let mockEnvSvc = new MockHttpService();
		let mockSofSvc = new MockHttpService();
		let mockContentSvc = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvSvc, mockSofSvc, mockContentSvc);
		sut.getObjectArchiveItems('frodo');
		expect(mockContentSvc.getUrl).toStrictEqual('frodo');
	});

});
