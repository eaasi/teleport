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

	constructor(method: string, data?: any) {
		this.method = method;
		if(data) this.data = JSON.stringify(data);
	}
}