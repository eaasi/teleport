/**
 * HTTPService Test Mock
 */

export class MockHttpService {
	getCount: number = 0;
	postCount: number = 0;
	deleteCount: number= 0;
	deleteData: object = {};
	getUrl: string = '';
	postUrl: string = '';
	deleteUrl: string = '';

	postData: object = {};
	deleteData: object = {};

	constructor() { }

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

	/**
	 * delete method spy
	 * @param url
	 * @param data
	 */
	async delete(url: string, data: object) {
		this.deleteCount += 1;
		this.deleteUrl = url;
		this.deleteData = data;
		return new Promise((resolve, reject) => {});
	}
}
