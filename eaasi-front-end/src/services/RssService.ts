import BaseHttpService from './BaseHttpService';
import {IRssFeed} from '@/types/RssFeed';

/**
 * Makes requests to internal API related to EaaSI blog syndication
 */
class RssService extends BaseHttpService {
	async getBlogFeed(): Promise<IRssFeed> {
		const res = await this.get<IRssFeed>('/blog/feed');
		if(!res.ok) return null;
		return res.result;
	}
}

export default new RssService();