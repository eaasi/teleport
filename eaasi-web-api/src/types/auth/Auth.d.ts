import { EaasiUser } from '@/data_access/models/app';
import { Request } from 'express';

export interface IAuthorizedRequest extends Request {
	body: EaasiUser;
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