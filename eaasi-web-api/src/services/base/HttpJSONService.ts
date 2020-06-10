import fetch, { RequestInit, Response } from 'node-fetch';
import IHttpService from '../interfaces/IHttpService';

export default class HttpJSONService implements IHttpService {

	private readonly _defaultOptions: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	};

	private readonly _uploadOptions: RequestInit = {
		headers: {
			'Accept': '*/*'
		},
	};

	/**
	 * Makes a GET request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async get(url: string, options?: RequestInit): Promise<Response> {
		let requestInit = this._createRequestInit('GET', null, options);
		return await fetch(url, requestInit);
	}

	/**
	 * Makes a POST request with a JSON body using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {any} data - request data
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async post(url: string, data: any, options?: RequestInit): Promise<Response> {
		let requestInit = this._createRequestInit('POST', data, options);
		return await fetch(url, requestInit);
	}

	/**
	 * Makes a PATCH request with a JSON body using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {any} data - request data
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async patch(url: string, data: any, options?: RequestInit): Promise<Response> {
		let requestInit = this._createRequestInit('PATCH', data, options);
		return await fetch(url, requestInit);
	}

	/**
	 * Makes a POST request for with files an upload
	 *
	 * @param {string} url - The request URL
	 * @param {any} data - request data
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async postUpload(url: string, data: any): Promise<Response> {
		let requestInit = this._createUploadRequestInit('POST', data);
		return await fetch(url, requestInit);
	}

	/**
	 * Makes a PATCH request with a JSON body using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {any} data - request data
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async patch(url: string, data: any, options?: RequestInit): Promise<Response> {
		let requestInit = this._createRequestInit('PATCH', data, options);
		return await fetch(url, requestInit);
	}

	/**
	 * Makes a DELETE request with a using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {RequestInit} [options] - Request options
	 * @return {Promise<Response>} - Response from fetch APY
	 */
	public async delete(url: string, data?: any, options?: RequestInit): Promise<Response> {
		let requestInit = this._createRequestInit('DELETE', data, options);
		return await fetch(url, requestInit);
	}

	/**
	 * Merges default options with other request properties
	 *
	 * @param {string} method - The Request method
	 * @param data - Optional JSON data ti send as post body
	 * @param {RequestInit} options = Request options
	 * @return {RequestInit} - Merged request options
	 */
	private _createRequestInit(method: string, data?: any, options?: RequestInit): RequestInit {
		if (typeof options !== 'object' || options === null) options = {};
		return {
			...this._defaultOptions,
			method,
			body: data ? JSON.stringify(data) : undefined,
			...options
		};
	}

	/**
	 * Makes request init for POST request with form-data
	 *
	 * @param {string} method - The Request method
	 * @param data - Optional JSON data ti send as post body
	 * @return {RequestInit} - Merged request options
	 */
	private _createUploadRequestInit(method: string, data?: any): RequestInit {
		data.fieldname = 'file';
		return {
			...this._uploadOptions,
			method: method,
			body: data,
		};
	}
}
