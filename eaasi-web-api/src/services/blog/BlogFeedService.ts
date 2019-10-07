import {BlogArticleLink, RssFeed} from '@/types/rss/RssFeed.ts';
import fetch from 'node-fetch';
import xml2js from 'xml2js';

export default class BlogFeedService {

	/**
	 * Returns an RSS Feed given a valid XML-based RSS feed URL
	 */
	public async getFeed(feedUrl: string) {
		let feedResult = await fetch(feedUrl);
		return await feedResult.text().then(xml => {
			return this._parseRssResult(xml);
		});
	}

	/**
	 * Serializes an RSS XML result into a new RssFeed object
	 * @param xml: string XML result
	 * @param numberOfArticles: maximum number of articles to display from feed
	 * @private
	 */
	private async _parseRssResult(xml, numberOfArticles = 8) {
	    let rssFeed;

		await xml2js.parseString(xml, (err, result) => {
			let blogDescription = result.rss.channel[0].description[0]
			let blogTitle = result.rss.channel[0].title[0]
			let articles = result.rss.channel[0].item
				.slice(0, numberOfArticles)
				.map(entry => new BlogArticleLink(entry))
			rssFeed = new RssFeed(articles, blogDescription, blogTitle);
		});

		return rssFeed ? rssFeed : RssFeed.empty();
	}
}
