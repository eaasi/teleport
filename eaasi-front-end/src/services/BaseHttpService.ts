import EaasiApiRequestInit from '@/models/http/EaasiApiRequestInit';
import { IEaasiApiResponse, IEaasiSearchQuery } from 'eaasi-http';
import eventBus from '@/utils/event-bus';
import { IEaasiApiRequestOptions } from 'eaasi-auth';

export default class BaseHttpService {
	readonly BASE_URL: string = process.env.VUE_APP_API_BASE_URL;
	readonly JWT_NAME: string = process.env.VUE_APP_JWT_NAME;

	/*============================================================
	 == CRUD Methods
	/============================================================*/

	/**
	 * Makes a GET request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async get<T>(url: string, options?: IEaasiApiRequestOptions): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'GET', null, options);
	}

	/**
	 * Makes a POST request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async post<T>(
		url: string,
		data: any,
		options?: IEaasiApiRequestOptions
	): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'POST', data, options);
	}

	/**
	 * Makes a PUT request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async put<T>(url: string, data: any, options?: IEaasiApiRequestOptions): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'PUT', data, options);
	}

	/**
	 * Makes a DELETE request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async delete<T>(url: string, options?: IEaasiApiRequestOptions): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'DELETE', null, options);
	}

	/*============================================================
	 == Helper Methods
	/============================================================*/

	/**
	 * Appends query parameters to a URL based on a search query object
	 *
	 * @param {string} url - The request url
	 * @param {IEaasiSearchQuery} query - A query for a paginated result set
	 * @return {string} - The parameterized url
	 */
	createQueryUrl(url: string, query?: IEaasiSearchQuery): string {
		if(!query) return url;
		let params = Object.keys(query);
		url = url.indexOf('?') > -1 ? url : url + '?';
		for (let i = 0; i < params.length; i++) {
			let value = query[params[i]];
			if (typeof value === 'undefined' || value === null) continue;
			url += `&${params[i]}=${query[params[i]]}`;
		}
		return url;
	}

	/*============================================================
	 == Private Methods
	/============================================================*/

	/**
	 * Makes an AJAX request using the fetch API and handles the response
	 *
	 * @param {string} url - The request URL
	 * @param {string} method  - The request method type
	 * @param {any} data - Data to send as the body of the request
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	private async _makeRequest<T>(
		url: string,
		method: string,
		data?: any,
		options?: IEaasiApiRequestOptions
	): Promise<IEaasiApiResponse<T>> {

		console.log(url, method, data, options);

		if(url.indexOf('://') === -1) url = this.BASE_URL + url;

		let self = this;
		let requestInit = new EaasiApiRequestInit(url, method, data, options);
		let request = new Request(url, requestInit);
		console.log(JSON.stringify(requestInit, null, 4));
		let response: IEaasiApiResponse<T>;
		options = options || requestInit.options;

		try {
			// Let Vue know that an ajax request has been initiated
			eventBus.$emit('ajaxStart', !options.suppressSpinner);
			let res = await fetch(request);

			// Let Vue know that an ajax request has been completed
			eventBus.$emit('ajaxEnd');
			response = res as IEaasiApiResponse<T>;

			// If 200 response, parse the body as the generic type
			if (res.ok) response.result = await res.json();

			// Handle non-200 responses
			else self._handleBadResponse<T>(requestInit, res, options.suppressErrors);
			return response;
		} catch (e) {
			eventBus.$emit('ajaxEnd');
			e.request = options;
			self._handleError(e, options.suppressErrors);
		}
	}

	/**
	 * Handles non-200 Fetch responses
	 *
	 * @param {Response} response - The fetch response object
	 * @param {boolean} suppressError - When true, will not alert the user of an error
	 */
	private async _handleBadResponse<T>(
		request: EaasiApiRequestInit,
		response: Response,
		suppressError: boolean
	): Promise<IEaasiApiResponse<T>> {
		let res = response as IEaasiApiResponse<T>;
		console.error('Received non-200 response from HttpService:', res.body);
		if (suppressError) return res;

		try {
			let error = await res.json();
			error.request = request;
			eventBus.$emit('ajaxError', error);
		} catch (e) {
			e.request = request;
			this._handleError(e, suppressError);
		}
		return response as IEaasiApiResponse<T>;
	}

	/**
	 * Handles any errors caught in _makeRequest
	 *
	 * @param {Error} e - The error
	 * @param {boolean} suppressError - When true, will not alert the user of an error
	 */
	private _handleError(e: Error, suppressError: boolean) {
		console.error(e);
		if (!suppressError) eventBus.$emit('ajaxError', e);
	}
}
