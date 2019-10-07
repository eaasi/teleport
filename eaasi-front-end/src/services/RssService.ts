import BaseHttpService from './BaseHttpService';

class RssService extends BaseHttpService {

	async getBlogFeed(): Promise<any> {
		let res = await this.get<any>('/blog/feed');
		console.log(res.body);
		console.log(res.result);
		// if(!res.ok) return null;
		// return res.result;
	}
}

export default new RssService();