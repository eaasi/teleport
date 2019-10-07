import BlogFeedService from '@/services/blog/BlogFeedService';
import BaseController from './base/BaseController';
import { Request, Response } from 'express';

export default class BlogFeedController extends BaseController {

	private readonly _blogService: BlogFeedService;

	constructor(blogFeedService = new BlogFeedService()) {
		super();
		this._blogService = blogFeedService;
	}

	async getFeed(req: Request, res: Response) {
		try {
			return await this._blogService.getFeed().then(feed => res.send(feed));
		} catch(e) {
			return await this.sendError(e.message, res);
		}
	}
}
