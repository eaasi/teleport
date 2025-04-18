import { IEaasiApiRequestOptions } from '@/types/Http';
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
		const token = Cookies.get(config.JWT_NAME);
		this.url = url;
		this.method = method;
		this.options = options || {};

		this.headers = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': token ? `Bearer ${token}` : null,
			'X-Requested-With':  'XMLHttpRequest'
		};

		if (options && options.acceptHeader) {
			this.headers['Accept'] = options.acceptHeader;
		}

		if (options && options.contentType) {
			this.headers['Content-Type'] = options.contentType;
		}

		if(method !== 'GET' && data != null) {
			this.body = JSON.stringify(data);
		}
	}
}