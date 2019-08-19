declare module 'eaasi-http' {
	export interface IEaasiApiResponse<T> extends Response {
		result: T;
	}

	export interface IEaasiSearchResponse<T> {
		count: number,
		result: T[],
		totalPages: number
	}

	export interface IEaasiSearchQuery {
		page: number;
		limit: number;
		keyword?: string;
		sortCol?: string;
		descending: boolean;
	}
}
