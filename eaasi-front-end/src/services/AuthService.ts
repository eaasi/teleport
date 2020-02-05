import BaseHttpService from './BaseHttpService';
import { IEaasiUser } from 'eaasi-admin';

class AuthService extends BaseHttpService {

	async getUserData(): Promise<IEaasiUser> {
		let res = await this.get<IEaasiUser>('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<any> {
		await this.delete('/auth/logout');
	}
}

export default new AuthService();