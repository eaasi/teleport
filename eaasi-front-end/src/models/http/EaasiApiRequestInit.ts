import { IEaasiApiRequestOptions } from 'eaasi-http';
import config from '@/config';
import Cookies from 'js-cookie';

export default class EaasiApiRequestInit implements RequestInit {
	readonly body?: any;
	readonly method: string;
	readonly credentials: RequestCredentials;
	readonly mode: RequestMode = 'cors';
	options: IEaasiApiRequestOptions;
	headers: HeadersInit;
	url: string;

	constructor(url: string, method: string, data: any = null, options?: IEaasiApiRequestOptions) {
		let token = Cookies.get(config.JWT_NAME);
		this.url = url;
		this.method = method;
		this.options = options || {};
		this.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': token ? `Bearer ${token}` : null,
			'X-Requested-With':  'XMLHttpRequest'
		};
		if(method !== 'GET' && data != null) {
			this.body = JSON.stringify(data);
		}
	}
}