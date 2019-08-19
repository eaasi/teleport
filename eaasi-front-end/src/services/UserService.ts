import BaseHttpService from './BaseHttpService';
import User from '@/models/auth/User';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiRole } from 'eaasi-auth';

class UserService extends BaseHttpService {
	async getUsers(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<User>> {
		let url = this.createQueryUrl('/eaasi-user', query);
		let res = await this.get<IEaasiSearchResponse<User>>(url);
		if (!res.ok) return null;
		return res.result as IEaasiSearchResponse<User>;
	}

	async getUser(id: number): Promise<User> {
		let res = await this.get<User>(`/eaasi-user/${id}`);
		if (!res.ok) return null;
		return res.result as User;
	}

	async addUser(user: User): Promise<User> {
		let res = await this.post<User>('/eaasi-user', user);
		if (!res.ok) return null;
		return res.result as User;
	}

	async updateUser(user: User): Promise<boolean> {
		let res = await this.put(`/eaasi-user/${user.id}`, user);
		return res.ok;
	}

	async deleteUser(id: number): Promise<boolean> {
		let res = await this.delete(`/eaasi-user/${id}`);
		return res.ok;
	}

	/* Roles
	============================================*/

	async getRoles(): Promise<IEaasiSearchResponse<IEaasiRole>>  {
		let url = this.createQueryUrl('/eaasi-role');
		let res = await this.get<IEaasiSearchResponse<IEaasiRole>>(url);
		if (!res.ok) return null;
		return res.result as IEaasiSearchResponse<IEaasiRole>;
	}
}

export default new UserService();
