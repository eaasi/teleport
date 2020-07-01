import { EaasiUser } from '@/data_access/models/app';
import { Request } from 'express';

export interface IAuthorizedRequest extends Request {
	user: EaasiUser;
}

export interface IAuthorizedGetRequest extends IAuthorizedRequest {
	params: {
		id: string;
	};
}

export interface IAuthorizedPostRequest<T> extends IAuthorizedRequest {
	body: T;
}

export interface IAuthorizedPatchRequest<T> extends IAuthorizedGetRequest {
	body: Partial<T>;
}

export interface IAuthorizedPutRequest<T> extends IAuthorizedGetRequest {
	body: Partial<T>;
}

export interface IAuthorizedDeleteRequest extends IAuthorizedRequest {
	params: {
		id: string;
	};
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	error: string;
	success: boolean;
	token?: string;
}

export interface IChangePasswordRequest extends IAuthorizedRequest {
	body: {
		password: string;
		newPassword: string;
		newPasswordConfirm: string;
	};
}