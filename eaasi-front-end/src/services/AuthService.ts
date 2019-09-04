import BaseHttpService from './BaseHttpService';
import { IEaasiAuthResponse } from 'eaasi-auth';

class AuthService extends BaseHttpService {

	async authorize(userId: number): Promise<IEaasiAuthResponse> {
		let res = await this.post('/auth/login', {userId});
		if(!res || !res.ok) return null;
		return res.result as IEaasiAuthResponse;
	}

	async logout(): Promise<boolean> {
		let res = await this.get('/auth/logout');
		return res.ok;
	}

	async validateToken(token): Promise<boolean> {
		let res = await this.post('/auth/validate', token, {
			suppressErrors: true,
			suppressSpinner: true
		});
		return res && res.ok;
	}
}

export default new AuthService();
