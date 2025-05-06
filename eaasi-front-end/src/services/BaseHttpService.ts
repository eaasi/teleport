import config from '@/config/index';
import events from '@/config/events';
import EaasiApiRequestInit from '@/models/http/EaasiApiRequestInit';
import { IEaasiApiRequestOptions, IEaasiApiResponse } from '@/types/Http';
import { IEaasiSearchQuery } from '@/types/Search';
import eventBus from '@/utils/event-bus';

export default class BaseHttpService {

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

	async getLocal<T>(url: string, options?: IEaasiApiRequestOptions): Promise<IEaasiApiResponse<T>> {
		return this._makeRequestLocal(url, 'GET', null, options);
	}

	/**
	 * Makes a POST request using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param {any} data
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async post<T>(
		url: string,
		data?: any,
		options?: IEaasiApiRequestOptions
	): Promise<IEaasiApiResponse<T>> {
		return this._makeRequest(url, 'POST', data, options);
	}

	async postLocal<T>(
		url: string,
		data?: any,
		options?: IEaasiApiRequestOptions
	): Promise<IEaasiApiResponse<T>> {
		return this._makeRequestLocal(url, 'POST', data, options);
	}

	/**
	 * Makes a POST request for uploading files using Fetch
	 *
	 * @param {string} url - The request URL
	 * @param data
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	async postUpload<T>(
		url: string,
		data: FormData,
	): Promise<IEaasiApiResponse<T>> {
		return this._makeUploadRequest(url, 'POST', data);
	}

	async postUploadExtended<T>(
		url: string,
		file: any,
	): Promise<IEaasiApiResponse<T>> {
		return this._makeUploadRequestExtended(url, 'POST', file);
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

	// noinspection JSMethodCanBeStatic
	/**
	 * Appends query parameters to a URL based on a search query object
	 *
	 * @param {string} url - The request url
	 * @param {IEaasiSearchQuery} query - A query for a paginated result set
	 * @return {string} - The parameterized url
	 */
	createQueryUrl(url: string, query?: IEaasiSearchQuery): string {
		if(!query) return url;
		const params = Object.keys(query);
		url = url.indexOf('?') > -1 ? url : url + '?';
		for (let i = 0; i < params.length; i++) {
			const value = query[params[i]];
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

		if (url.indexOf('://') === -1) url = config.SERVICE_URL + url;

		const self = this;
		const requestInit = new EaasiApiRequestInit(url, method, data, options);
		const request = new Request(url, requestInit);

		let response: IEaasiApiResponse<T>;
		options = options || requestInit.options;

		try {
			// Let Vue know that an ajax request has been initiated
			if (!options.suppressSpinner) eventBus.$emit('ajaxStart');

			const res = await fetch(request);

			response = res as IEaasiApiResponse<T>;

			// If 200 response, parse the body as the generic type
			if (res.ok) response.result = await res.json();

			// Handle non-200 responses
			else await self._handleBadResponse<T>(requestInit, res, options.suppressErrors);

			// Let Vue know that an ajax request has been completed
			if (!options.suppressSpinner) eventBus.$emit('ajaxEnd');

			if (response.status === 429) eventBus.$emit(events.REQUEST_LIMIT_REACHED);

			if (response.status === 401) eventBus.$emit(events.UNAUTHORIZED_ERROR);

			return response;
		} catch (e) {
			eventBus.$emit('ajaxEnd');
			e.request = options;
			self._handleError(e, options.suppressErrors);
		}
	}

	private async _makeRequestLocal<T>(
		url: string,
		method: string,
		data?: any,
		options?: IEaasiApiRequestOptions
	): Promise<IEaasiApiResponse<T>> {

		const self = this;
		const requestInit = new EaasiApiRequestInit(url, method, data, options);
		const request = new Request(url, requestInit);

		let response: IEaasiApiResponse<T>;
		options = options || requestInit.options;

		try {
			// Let Vue know that an ajax request has been initiated
			if (!options.suppressSpinner) eventBus.$emit('ajaxStart');

			const res = await fetch(request);

			response = res as IEaasiApiResponse<T>;

			// If 200 response, parse the body as the generic type
			if (res.ok) response.result = await res.json();

			// Handle non-200 responses
			else await self._handleBadResponse<T>(requestInit, res, options.suppressErrors);

			// Let Vue know that an ajax request has been completed
			if (!options.suppressSpinner) eventBus.$emit('ajaxEnd');

			if (response.status === 429) eventBus.$emit(events.REQUEST_LIMIT_REACHED);

			if (response.status === 401) eventBus.$emit(events.UNAUTHORIZED_ERROR);

			return response;
		} catch (e) {
			eventBus.$emit('ajaxEnd');
			e.request = options;
			self._handleError(e, options.suppressErrors);
		}
	}

	/**
	 * Makes an AJAX request using the fetch API for an upload and handles the response
	 *
	 * @param {string} url - The request URL
	 * @param {string} method  - The request method type
	 * @param data
	 * @param {IEaasiApiRequestOptions} [options] - Request options
	 * @return {Promise<IEaasiApiResponse<T>>} - A parsed API response
	 */
	private async _makeUploadRequest<T>(
		url: string,
		method: string,
		data: FormData,
	): Promise<IEaasiApiResponse<T>> {
		if (url.indexOf('://') === -1) url = config.SERVICE_URL + url;
		let response: IEaasiApiResponse<T>;
		try {
			eventBus.$emit('ajaxStart', true);

			const headers = {
				'Accept': '*/*',
			};

			const res = await fetch(url, {
				method: method,
				headers: headers,
				body: data
			});

			eventBus.$emit('ajaxEnd', true);
			response = res as IEaasiApiResponse<T>;

			// If 200 response, parse the body as the generic type
			if (res.ok) {
				response.result = await res.json();
			}

			// TODO: Handle non-200 responses

			return response;

		} catch (e) {
			console.warn(e);
			eventBus.$emit('ajaxEnd');
		}
	}

	private async _makeUploadRequestExtended<T>(
		url: string,
		method: string,
		file: any,
	): Promise<IEaasiApiResponse<T>> {
		let response: IEaasiApiResponse<T>;
		try {
			eventBus.$emit('ajaxStart', true);

			const headers = {
				'content-type': 'application/octet-stream',
				'x-eaas-filename': file.name,
			};

			const res = await fetch(url, {
				method: method,
				headers: headers,
				body: file.file
			});

			eventBus.$emit('ajaxEnd', true);
			response = res as IEaasiApiResponse<T>;

			// If 200 response, parse the body as the generic type
			if (res.ok) {
				response.result = await res.json();
			}

			return response;

		} catch (e) {
			console.warn(e);
			eventBus.$emit('ajaxEnd');
		}
	}

	/**
	 * Handles non-200 Fetch responses
	 *
	 * @param {Request} request - The fetch request object
	 * @param {Response} response - The fetch response object
	 * @param {boolean} suppressError - When true, will not alert the user of an error
	 */
	private async _handleBadResponse<T>(
		request: EaasiApiRequestInit,
		response: Response,
		suppressError: boolean
	): Promise<IEaasiApiResponse<T>> {
		const res = response as IEaasiApiResponse<T>;

		console.error('Received non-200 response from HttpService:', res.body);

		if (suppressError) return res;

		try {
			const error = await res.json();
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
