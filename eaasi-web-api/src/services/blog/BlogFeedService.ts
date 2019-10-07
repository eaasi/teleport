import HttpXMLService from '@/services/base/HttpXMLService';
import fetch from 'node-fetch';
import xml2js from 'xml2js';

const BASE_URL = 'https://www.softwarepreservationnetwork.org/blog/feed/';

export default class BlogFeedService {

	private readonly _svc: HttpXMLService

	constructor() {
		this._svc = new HttpXMLService();
	}

	public async getFeed() {
		fetch(BASE_URL).then((res) => {
			res.text().then((xml) => {
				xml2js.parseString(xml, function (err, result) {
				});
			})
		})
	}
}
