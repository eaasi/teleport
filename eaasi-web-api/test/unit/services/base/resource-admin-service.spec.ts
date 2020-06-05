import { MockHttpService } from '../../../helpers/doubles/mock-http-service';
import ResourceAdminService from '../../../../src/services/resource/ResourceAdminService';
import {resourceTypes} from '../../../../src/utils/constants';
import { MockCrudService } from '../../../helpers/doubles/mock-crud-service';
import { MockBaseService } from '../../../helpers/doubles/mock-base-service';
import { IResourceSearchQuery } from '@/types/resource/Resource';

describe('UserAdminService', () => {
	const MOCK_USER_ID = 1;
	let mockEnvironmentSvc,
		mockSoftwareSvc,
		mockImportedContentSvc,
		mockClassificationSvc,
		mockBookmarkSvc,
		mockImportSvc,
		sut;

	beforeEach(() => {
		mockEnvironmentSvc = new MockBaseService();
		mockSoftwareSvc = new MockBaseService();
		mockImportedContentSvc = new MockBaseService();
		mockClassificationSvc = new MockHttpService();
		mockBookmarkSvc = new MockCrudService();
		mockImportSvc = new MockBaseService();
		sut = new ResourceAdminService(mockEnvironmentSvc, mockSoftwareSvc, mockImportedContentSvc, mockClassificationSvc, mockBookmarkSvc,  mockImportSvc);
	});

	describe('constructor tests', () => {
		it('on initialization sets an IHttpService service for _environmentService', () => {
			expect(sut._environmentService).toBe(mockEnvironmentSvc);
		});

		it('on initialization sets an IHttpService service for _softwareService', () => {
			expect(sut._softwareService).toBe(mockSoftwareSvc);
		});

		it('on initialization sets an IHttpService service for _importedContentService', () => {
			expect(sut._importedContentService).toBe(mockImportedContentSvc);
		});

		it('on initialization sets an IHttpService service for _emilClassificationService', () => {
			expect(sut._emilClassificationService).toBe(mockClassificationSvc);
		});

		it('on initialization sets an IHttpService service for _bookmarkService', () => {
			expect(sut._bookmarkService).toBe(mockBookmarkSvc);
		});
	});

	describe('default query method tests', () => {

		let query: IResourceSearchQuery;

		beforeEach(() => {
			query = {
				page: 1,
				limit: 94,
				keyword: 'c++',
				descending: false,
				types: [resourceTypes.ENVIRONMENT, resourceTypes.SOFTWARE, resourceTypes.CONTENT],
				selectedFacets: []
			};
		});

		it('on searchResources calls get on environment service exactly once given environments', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockEnvironmentSvc.getCount).toBe(1)
			);
		});

		it('on searchResources calls get on environment service given query keyword', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockEnvironmentSvc.getUrl).toBe('') // keyword currently applied post-hoc in filter
			);
		});

		it('on searchResources calls get on software service exactly once given software', () => {
			sut.searchResources(query, MOCK_USER_ID);
		});

		it('on searchResources calls get on content service given query keyword', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockImportedContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
			);
		});

		it('on searchResources calls get on software service with \'getSoftwarePackageDescriptions\' given query keyword', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockSoftwareSvc.getUrl).toBe('getSoftwarePackageDescriptions')
			);
		});

		it('on searchResources calls get on content service exactly once given content', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockImportedContentSvc.getCount).toBe(1)
			);
		});

		it('on searchResources calls get on content service given query keyword', () => {
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockImportedContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
			);
		});

		it('on searchResources calls get on searchable types in query only - environment and content only', () => {
			query.types = [resourceTypes.ENVIRONMENT, resourceTypes.CONTENT]
			sut.searchResources(query, MOCK_USER_ID).then(() =>  {
				expect(mockEnvironmentSvc.getCount).toBe(1);
				expect(mockImportedContentSvc.getCount).toBe(1);
				expect(mockSoftwareSvc.getCount).toBe(0);
			});
		});

		it('on searchResources calls get on searchable types in query only - software only', () => {
			query.types = [resourceTypes.SOFTWARE]
			sut.searchResources(query, MOCK_USER_ID).then(() =>  {
				expect(mockEnvironmentSvc.getCount).toBe(0);
				expect(mockImportedContentSvc.getCount).toBe(0);
				expect(mockSoftwareSvc.getCount).toBe(1);
			});
		});

		it('on searchResources calls get on searchable types in query only - software and environment only', () => {
			query.types = [resourceTypes.SOFTWARE, resourceTypes.ENVIRONMENT]
			sut.searchResources(query, MOCK_USER_ID).then(() =>  {
				expect(mockEnvironmentSvc.getCount).toBe(1);
				expect(mockImportedContentSvc.getCount).toBe(0);
				expect(mockSoftwareSvc.getCount).toBe(1);
			});
		});

		it('on searchResources calls get on environment service given no query types', () => {
			query.types = undefined;
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockEnvironmentSvc.getUrl).toBe('')
			);
		});

		it('on searchResources calls get on software service given no query types', () => {
			query.types = undefined;
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockSoftwareSvc.getUrl).toBe('getSoftwarePackageDescriptions')
			);
		});

		it('on searchResources calls get on content service given no query types', () => {
			query.types = undefined;
			sut.searchResources(query, MOCK_USER_ID).then(() =>
				expect(mockImportedContentSvc.getUrl).toBe('zero%20conf') // getUrl for Content service currently needs to be 'zero conf'
			);
		});

	});

});