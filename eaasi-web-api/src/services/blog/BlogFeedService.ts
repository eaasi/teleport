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

		fetch(BASE_URL).then((res) => {
			res.text().then((xml) => {
				xml2js.parseString(xml, function (err, result) {
					let blogDescription = result.rss.channel[0].description[0]

					let articles = result.rss.channel[0].item
						.slice(0, NUMBER_BLOG_LINKS_DISPLAYED)
						.map(entry => new BlogArticleLink(entry))

					console.log(articles)

				});
			})
		})
	}
}
