import { IErrorResponse } from '@/types/general/http';

export default class ErrorResponse implements IErrorResponse {
	constructor(httpStatusCode: number, message: string) {
		this.hasError = true;
		this.status = httpStatusCode;
		this.message = message;
	}

	hasError: boolean;
	message: string;
	status: number;
}
