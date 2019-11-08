/**
 * HTMLService Test Mock
 */

export class MockHtmlService {
	getCount: number = 0;
	postCount: number = 0;
	getUrl: string = '';
	postUrl: string = '';
	postData: object = {};

	constructor() {
	}

	/**
	 * get method spy
	 * @param url
	 */
	async get(url: string) {
		this.getCount += 1;
		this.getUrl = url;
		return new Promise((resolve, reject) => {});
	}

	/**
	 * post method spy
	 * @param url
	 * @param data
	 */
	async post(url: string, data: object) {
		this.postCount += 1;
		this.postUrl = url;
		this.postData = data;
		return new Promise((resolve, reject) => {});
	}
}
