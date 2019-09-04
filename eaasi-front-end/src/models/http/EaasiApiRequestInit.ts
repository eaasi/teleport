import { IEaasiApiRequestOptions } from 'eaasi-auth';
import config from '@/config';

export default class EaasiApiRequestInit implements RequestInit {
	readonly data: any
	readonly method: string
	readonly credentials: RequestCredentials = 'include'
	readonly mode: RequestMode = 'cors'
	options: IEaasiApiRequestOptions
	headers: HeadersInit
	url: string

	constructor(url: string, method: string, data?: any, options?: IEaasiApiRequestOptions) {
		let token = localStorage.getItem(config.JWT_NAME);
		this.url = url;
		this.method = method;
		this.options = options || {};
		this.data = this.data ? JSON.stringify(data) : null;
		this.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': token ? `Bearer ${token}` : null,
			'X-Requested-With':  'XMLHttpRequest'
		};
	}
}