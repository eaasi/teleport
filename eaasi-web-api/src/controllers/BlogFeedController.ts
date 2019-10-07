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
		console.log('in blog feed')
		try {
			let blogFeed = await this._blogService.getFeed();
			res.send(blogFeed);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
