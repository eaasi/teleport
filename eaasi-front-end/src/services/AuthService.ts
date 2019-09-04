import BaseHttpService from './BaseHttpService';
import { IEaasiAuthResponse } from 'eaasi-auth';

class AuthService extends BaseHttpService {

	async getUserData() {
		let res = await this.get('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<boolean> {
		let res = await this.get('/auth/logout');
		return res.ok;
	}

}

export default new AuthService();
