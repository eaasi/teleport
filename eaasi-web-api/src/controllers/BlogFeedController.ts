import BlogFeedService from '@/services/blog/BlogFeedService';
import BaseController from './base/BaseController';
import { Request, Response } from 'express';

const RSS_FEED_URL = 'https://www.softwarepreservationnetwork.org/blog/feed/';

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
			this.sendError(e.message, res);
			return null;
		}
	}
}
