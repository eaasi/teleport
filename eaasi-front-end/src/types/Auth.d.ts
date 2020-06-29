export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
	error: string;
	success: boolean;
	token?: string;
}

export interface IChangePasswordRequest {
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
}