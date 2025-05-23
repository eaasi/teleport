import Cookies from 'js-cookie';
import config from '@/config';
import BaseHttpService from './BaseHttpService';
import { ILoginRequest, ILoginResponse, IChangePasswordRequest } from '@/types/Auth';
import { IKeycloakUser } from '@/types/Keycloak';

class AuthService extends BaseHttpService {

	async changePassword(req: IChangePasswordRequest) {
		const res = await this.post<Boolean>('/auth/change-password', req);

		if (!res) return false;

		if (res.status === 400) {
			return false;
		}

		return res.result;
	}

	async getUserData(): Promise<IKeycloakUser> {
		const res = await this.get<IKeycloakUser>('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<any> {
		const res = await this.delete('/auth/logout');
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
