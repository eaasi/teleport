import HttpXMLService from '@/services/base/HttpXMLService';
import {BlogArticleLink, RssFeed} from '@/types/rss/RssFeed.ts';
import fetch from 'node-fetch';
import xml2js from 'xml2js';

const BASE_URL = 'https://www.softwarepreservationnetwork.org/blog/feed/';
const NUMBER_BLOG_LINKS_DISPLAYED = 6

export default class BlogFeedService {

	private readonly _svc: HttpXMLService

	constructor() {
		this._svc = new HttpXMLService();
	}

	public async getFeed() {
		let feedResult = await fetch(BASE_URL);
		return await feedResult.text().then(xml => {
			let jsonResult = this._parseRssResult(xml);
			console.log(jsonResult)
			return jsonResult;
		});
	}

	private async _parseRssResult(xml) {
	    let rssFeed;

		await xml2js.parseString(xml, (err, result) => {
			let blogDescription = result.rss.channel[0].description[0]
			let blogTitle = result.rss.channel[0].title[0]
			let articles = result.rss.channel[0].item
				.slice(0, NUMBER_BLOG_LINKS_DISPLAYED)
				.map(entry => new BlogArticleLink(entry))
			rssFeed = new RssFeed(articles, blogDescription, blogTitle);
		});

		return rssFeed ? rssFeed : RssFeed.empty();
	}
}
