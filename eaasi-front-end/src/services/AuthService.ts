import { IEaasiUser } from 'eaasi-admin';
import BaseHttpService from './BaseHttpService';

class AuthService extends BaseHttpService {

	async getUserData(): Promise<IEaasiUser> {
		let res = await this.get<IEaasiUser>('/auth/user');
		if(!res || !res.ok) return null;
		return res.result;
	}

	async logout(): Promise<void> {
		await this.delete('/auth/logout');
	}
}

export default new AuthService();
