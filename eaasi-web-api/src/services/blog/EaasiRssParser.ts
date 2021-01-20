import RssParser from '@/types/blog/RssParser';
import {EaasiBlogArticleLink} from '@/types/rss/RssFeed';

/**
 * Parses an RSS Feed according to the EaaSI Blog Format
 */
export default class EaasiRssParser implements RssParser {
	rssResponse: any;

	constructor() {
	}

	setRssToParse(rss: any) {
    	this.rssResponse = rss;
	}

	getBlogTitle() {
		return this.rssResponse.rss.channel[0].title[0]
	}

	getBlogDescription() {
		return this.rssResponse.rss.channel[0].description[0]
	}

	getBlogArticles(numberOfArticles: number = 6) {
		if (!this.rssResponse) return [];
		if (!this.rssResponse.rss) return [];
		if (!this.rssResponse.rss.channel) return [];
		if (!this.rssResponse.rss.channel[0]) return [];
		if (!this.rssResponse.rss.channel[0].item) return [];

		return this.rssResponse.rss.channel[0].item
			.slice(0, numberOfArticles)
			.map(entry => new EaasiBlogArticleLink(entry))
	}
}
