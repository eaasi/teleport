declare module 'eaasi-http' {
	export interface IEaasiApiResponse<T> extends Response {
		result: T;
	}

	export interface IEaasiApiRequestOptions {
		suppressErrors?: boolean,
		suppressSpinner?: boolean
	}

}
