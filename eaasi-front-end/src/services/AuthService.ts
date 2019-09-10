import BaseHttpService from './BaseHttpService';
import { IEaasiAuthResponse, IEaasiUser } from 'eaasi-admin';

class AuthService extends BaseHttpService {

	async getUserData(): Promise<IEaasiUser> {
		let res = await this.get<IEaasiUser>('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<boolean> {
		let res = await this.delete('/auth/logout');
		return res.ok;
	}

}

export default new AuthService();