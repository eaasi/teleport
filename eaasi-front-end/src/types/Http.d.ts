export interface IEaasiApiResponse<T> extends Response {
	result: T;
}

export interface IEaasiApiRequestOptions {
	suppressErrors?: boolean,
	suppressSpinner?: boolean,
	acceptHeader?: string,
	contentType?: string,
	noSniff?: boolean,
}

export interface IEmilResult {
	status: '0' | '1';
	message: string;
}
