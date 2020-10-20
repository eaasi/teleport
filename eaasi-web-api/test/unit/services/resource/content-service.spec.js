import ContentService from '../../../../src/services/resource/ContentService';
import { MockHttpService } from '../../../helpers/doubles/mock-http-service';

describe('ContentService', () => {

	it('on getObjectArchive calls content service archives', () => {
		let mockContentSvc = new MockHttpService();
		let sut = new ContentService(mockContentSvc);
		sut.getObjectArchives();
		expect(mockContentSvc.getUrl).toStrictEqual('archives');
	});

	it('on getObjectArchiveItems calls content service by archiveId', () => {
		let mockContentSvc = new MockHttpService();
		let sut = new ContentService(mockContentSvc);
		const contentRequest = {
			archiveName: 'frodo',
			contentId: 'guy'
		}
		sut.getObjectMetadata(contentRequest);
		expect(mockContentSvc.getUrl).toStrictEqual(`archives/${contentRequest.archiveName}/objects/${contentRequest.contentId}`);
	});
	
})