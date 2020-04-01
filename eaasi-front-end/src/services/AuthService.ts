import config from '@/config';
import { ILoginRequest, ILoginResponse } from '@/types/Auth';
import { IEaasiUser } from 'eaasi-admin';
import Cookies from 'js-cookie';
import BaseHttpService from './BaseHttpService';

class AuthService extends BaseHttpService {

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
		const res = await this.post('/auth/authenticate', loginRequest);
		const result = res.result as ILoginResponse;
		if (!result || !result.success) return false;
		this.addJWTCookie(result.token);
		return true;
	}

	private addJWTCookie(jwt: string) {
		Cookies.set(config.JWT_NAME, jwt, { path: '/' });
	}

}

export default new AuthService();
