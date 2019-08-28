export default class EaasiApiRequest {
	readonly data?: any = null
	readonly method: string = 'GET'
	readonly credentials: RequestCredentials = 'include'
	readonly mode: RequestMode = 'cors'
	suppressErrors: false
	suppressSpinner: false
	headers: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}
	url: string

	constructor(url: string, method: string, data?: any) {
		this.url = url;
		this.method = method;
		if(data) this.data = JSON.stringify(data);
	}
}