import BaseHttpService from './BaseHttpService';
import User from '@/models/admin/User';
import { IEaasiSearchQuery, IEaasiSearchResponse } from 'eaasi-http';
import { IEaasiRole, IEmulator } from 'eaasi-admin';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import { ITaskState } from '@/types/Task';

class AdminService extends BaseHttpService {

	/* Emulators
	============================================*/

	async getEmulators(): Promise<IEmulator[]> {
		let res = await this.get<IEmulator[]>('/admin/get-emulators');
		if (!res.ok) return null;
		return res.result as IEmulator[];
	}

	async importEmulator(req: EmulatorImportRequest): Promise<ITaskState> {
		let res = await this.post('/admin/import-emulator', req);
		if (!res.ok) return null;
		return res.result as ITaskState;
	}

	async setDefaultEmulatorVersion(entry: any) {
		let res = await this.post<any>('/admin/set-default-emulator-version', entry);
		if (!res.ok) return null;
		return res.result;
	}

	/* Users
	============================================*/

	async getUsers(query: IEaasiSearchQuery): Promise<IEaasiSearchResponse<User>> {
		let url = this.createQueryUrl('/admin/get-users', query);
		let res = await this.get<IEaasiSearchResponse<User>>(url);
		if (!res.ok) return null;
		return res.result as IEaasiSearchResponse<User>;
	}

	async getUser(id: number): Promise<User> {
		let res = await this.get<User>(`/admin/users?id=${id}`);
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

	/* User Roles
	============================================*/

	async getRoles(): Promise<IEaasiSearchResponse<IEaasiRole>>  {
		let url = this.createQueryUrl('/admin/get-user-roles');
		let res = await this.get<IEaasiSearchResponse<IEaasiRole>>(url);
		if (!res.ok) return null;
		return res.result as IEaasiSearchResponse<IEaasiRole>;
	}

}

export default new AdminService();