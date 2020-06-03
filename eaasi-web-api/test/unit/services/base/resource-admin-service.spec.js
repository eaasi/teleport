import { MockHttpService } from '../../../helpers/doubles/mock-http-service';
import ResourceAdminService from '../../../../src/services/resource/ResourceAdminService';
import {resourceTypes} from '../../../../src/utils/constants';
import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import { MockCrudService } from '../../../helpers/doubles/mock-crud-service';
import { MockBaseService } from '../../../helpers/doubles/mock-base-service';

describe('UserAdminService', () => {
	// Constructor Tests

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService);
		expect(sut._environmentService).toBe(mockEnvironmentService);
	});

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService);
		expect(sut._softwareService).toBe(mockSoftwareService);
	});

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
		expect(sut._contentService).toBe(mockContentService);
	});

	it('on initialization sets an IHttpService service for _emilEnvSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let mockClassificationService = new MockHttpService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService, mockClassificationService);
		expect(sut._emilClassificationService).toBe(mockClassificationService);
	});

	it('on initialization sets an IHttpService service for _emilSofSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let mockClassificationService = new MockHttpService();
		let mockBookmarkService = new MockCrudService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService, mockClassificationService, mockBookmarkService);
		expect(sut._bookmarkService).toBe(mockBookmarkService);
	});

	it('on initialization sets an IHttpService service for _emilSofSvc', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let mockClassificationService = new MockHttpService();
		let mockBookmarkService = new MockCrudService();
		let mockImportService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService, mockClassificationService, mockBookmarkService,  mockImportService);
		expect(sut._resourceImportService).toBe(mockImportService);
	});

	it('on searchResources calls get on environment service exactly once given environments', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
		let query = {
			keyword: 'c++',
			limit: 94,
			types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT]
		};
		sut.searchResources(query);
	});

	it('on searchResources calls get on content service given query keyword', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
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
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockEnvSvc.getUrl).toBe('')
		);
	});

	it('on searchResources calls get on software service given no query types', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockSofSvc.getUrl).toBe('getSoftwarePackageDescriptions')
		);
	});

	it('on searchResources calls get on content service given no query types', () => {
		let mockEnvironmentService = new MockBaseService();
		let mockSoftwareService = new MockBaseService();
		let mockContentService = new MockBaseService();
		let sut = new ResourceAdminService(mockEnvironmentService, mockSoftwareService, mockContentService);
		let query = {
			keyword: 'c++',
			limit: 94,
		};
		sut.searchResources(query).then(_ => 
			expect(mockContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
		);
	});

});