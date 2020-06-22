import { Request } from 'express';
import { EaasiUser } from '@/data_access/models/app';

export interface IAuthorizedRequest extends Request {
	user: EaasiUser;
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