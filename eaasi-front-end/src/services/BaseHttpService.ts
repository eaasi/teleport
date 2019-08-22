import EaasiApiRequest from '@/models/http/EaasiApiRequest';
import { IEaasiApiResponse, IEaasiSearchQuery } from 'eaasi-http';
import eventBus from '@/utils/event-bus';

export default class BaseHttpService {
	readonly BASE_URL: string = process.env.VUE_APP_API_BASE_URL;

	/*============================================================
	 == CRUD Methods
	/============================================================*/

	/**
	 * Makes a GET request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async get<T>(url: string, options?: EaasiApiRequest): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'GET', null, options);
	}

	/**
	 * Makes a POST request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async post<T>(
		url: string,
		data: any,
		options?: EaasiApiRequest
	): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'POST', data, options);
	}

	/**
	 * Makes a PUT request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async put<T>(url: string, data: any, options?: EaasiApiRequest): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'PUT', data, options);
	}

	/**
	 * Makes a DELETE request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async delete<T>(url: string, options?: EaasiApiRequest): Promise<IEaasiApiResponse<T>> {
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
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	private async _makeRequest<T>(
		url: string,
		method: string,
		data?: any,
		options?: EaasiApiRequest
	): Promise<IEaasiApiResponse<T>> {
		let self = this;
		if (!options) options = new EaasiApiRequest(method, data);
		let request = self._createRequest(url, options);
		let response: IEaasiApiResponse<T>;

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
			else self._handleBadResponse<T>(res, options.suppressErrors);
			return response;
		} catch (e) {
			eventBus.$emit('ajaxEnd');
			self._handleError(e, options.suppressErrors);
		}
	}

	/**
	 *	Creates a Request object using properties from EaasiApiRequest
	 *
	 * @param {string} url - The request URL
	 * @param {EaasiApiRequest} [options] - Request options
	 * @return {Request} A fetch request object
	 */
	private _createRequest(url: string, options: EaasiApiRequest): Request {
		let token = localStorage.getItem('EAASI_TOKEN');
		return new Request(this.BASE_URL + url, {
			method: options.method,
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': token ? `Bearer ${token}` : null
			},
			mode: options.mode,
			body: options.data
		});
	}

	/**
	 * Handles non-200 Fetch responses
	 *
	 * @param {Response} response - The fetch response object
	 * @param {boolean} suppressError - When true, will not alert the user of an error
	 */
	private async _handleBadResponse<T>(
		response: Response,
		suppressError: boolean
	): Promise<IEaasiApiResponse<T>> {
		let res = response as IEaasiApiResponse<T>;
		console.error('Received non-200 response from HttpService:', res.body);
		if (suppressError) return res;

		try {
			let error = await res.body;
			eventBus.$emit('ajaxError', error);
		} catch (e) {
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
