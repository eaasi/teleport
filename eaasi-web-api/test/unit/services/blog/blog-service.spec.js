import {RssParserFake} from '../../../helpers/doubles/rss-parser-fake';
import BlogFeedService from '../../../../src/services/blog/BlogFeedService';

describe('Blog Feed Service', () => {

	// Constructor Tests

	it('sets an RSS parser given ctor argument', () => {
		let rssParserFake = new RssParserFake();
		let sut = new BlogFeedService(rssParserFake);
		expect(sut.rssParser).toBe(rssParserFake);
	});
});
