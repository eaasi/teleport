import config from '@/config';
import { ILoginRequest, ILoginResponse, IChangePasswordRequest } from '@/types/Auth';
import { IEaasiUser } from 'eaasi-admin';
import Cookies from 'js-cookie';
import BaseHttpService from './BaseHttpService';

class AuthService extends BaseHttpService {

	async changePassword(req: IChangePasswordRequest) {
		let res = await this.post<Boolean>('/auth/change-password', req);
		if(!res) return null;
		return res.result;
	}

	async getUserData(): Promise<IEaasiUser> {
		let res = await this.get<IEaasiUser>('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<any> {
		let res = await this.delete('/auth/logout');
		if (!res || !res.ok) return null;
		return res.result;
	}

	async login(loginRequest: ILoginRequest): Promise<boolean> {
		const res = await this.post<ILoginResponse>('/auth/authenticate', loginRequest);
		if (!res.result || !res.result.success) return false;
		this.addJWTCookie(res.result.token);
		return true;
	}

	private addJWTCookie(jwt: string) {
		Cookies.set(config.JWT_NAME, jwt, { path: '/' });
	}

}

export default new AuthService();
