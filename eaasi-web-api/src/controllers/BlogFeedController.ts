import BlogFeedService from '@/services/blog/BlogFeedService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

/**
 * As of Jan 2021 this feed contains no usable data
 */
const RSS_FEED_URL = 'https://www.softwarepreservationnetwork.org/spn-news/feed/';

export default class BlogFeedController extends BaseController {

	private readonly _blogService: BlogFeedService;

	constructor(blogFeedService = new BlogFeedService()) {
		super();
		this._blogService = blogFeedService;
	}

	async getFeed(req: Request, res: Response) {
		try {
			return await this._blogService.getFeed(RSS_FEED_URL)
				.then(feed => res.send(feed));
		} catch(e) {
			this.sendError(e, res);
			return null;
		}
	}
}
