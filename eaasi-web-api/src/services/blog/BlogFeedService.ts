import EaasiRssParser from '@/services/blog/EaasiRssParser';
import RssParser from '@/types/blog/RssParser';
import {RssFeed} from '@/types/rss/RssFeed';
import fetch from 'node-fetch';
import xml2js from 'xml2js';

export default class BlogFeedService {

	rssParser: RssParser;

	constructor(rssParser: any = new EaasiRssParser()) {
		this.rssParser = rssParser;
	}

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
			if (!err) {
				this.rssParser.setRssToParse(result);
				let blogDescription = this.rssParser.getBlogDescription();
				let blogTitle = this.rssParser.getBlogTitle();
				let articles = this.rssParser.getBlogArticles(numberOfArticles);
				rssFeed = new RssFeed(articles, blogDescription, blogTitle);
			} else {
				console.error('Error reading Blog RSS Feed')
			}
		});

		return rssFeed ? rssFeed : RssFeed.empty();
	}
}
