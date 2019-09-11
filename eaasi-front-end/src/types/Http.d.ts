declare module 'eaasi-http' {
	export interface IEaasiApiResponse<T> extends Response {
		result: T;
	}

	export interface IEaasiSearchResponse<T> {
		result: T[],
		totalResults: number
	}

	export interface IEaasiSearchQuery {
		page: number;
		limit: number;
		keyword?: string;
		sortCol?: string;
		descending: boolean;
	}

	export interface IEaasiApiRequestOptions {
		suppressErrors?: boolean,
		suppressSpinner?: boolean
	}
}
