import BaseHttpService from './BaseHttpService';

class RssService extends BaseHttpService {

	async getLatestBlogArticles(): Promise<any> {

		console.log('getting blog articles');

		let request = new Request('cors-anywhere.herokuapp.com/https://www.softwarepreservationnetwork.org/blog/feed/');

		let response: any;
	}
}

export default new RssService();