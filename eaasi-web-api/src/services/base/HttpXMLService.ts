import fetch, { RequestInit, Response } from 'node-fetch';

const parseString = require('xml2js').parseString;

export default class HttpXMLService {
	private readonly _defaultOptions: RequestInit = {
		headers: {
			'Content-Type': 'text/xml',
			'Accept': 'text/xml'
		},
	}

	/**
	 * Makes a GET request using Fetch for XML data, returns result as JSON
	 *
	 * @param {string} url - The request URL
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async getAsJson(url: string, options?: RequestInit): Promise<Response> {
		let res = await fetch(url);
		console.log(res)
		return res;
	}
}
