import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import { IApplicationLog } from '@/types/ApplicationLog';
import { IAddHarvesterRequest, IHarvesterSyncResult } from '@/types/Harvesters';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { ITaskState } from '@/types/Task';
import { IEaasiRole, IEmulator } from 'eaasi-admin';
import BaseHttpService from './BaseHttpService';

class AdminService extends BaseHttpService {

	/* Emulators
	============================================*/

	async getEmulators(): Promise<IEmulator[]> {
		let res = await this.get<IEmulator[]>('/admin/get-emulators');
		if (!res.ok) return null;
		return res.result;
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
		let url = this.createQueryUrl('/admin/users/list', query);
		let res = await this.get<IEaasiSearchResponse<User>>(url);
		if (!res.ok) return null;
		return res.result;
	}

	async saveUser(user: User): Promise<boolean> {
		let res = await this.post('/admin/users/save', user);
		return res.ok;
	}

	async deleteUser(id: number): Promise<boolean> {
		let res = await this.post(`/admin/users/delete?id=${id}`, {});
		return res.ok;
	}

	async resetUserPassword(email: string): Promise<boolean> {
		let res = await this.post<any>('/admin/users/reset-password', { email });
		return res.ok && res.result;
	}

	/* User Roles
	============================================*/

	async getRoles(): Promise<IEaasiSearchResponse<IEaasiRole>>  {
		let url = this.createQueryUrl('/admin/users/roles');
		let res = await this.get<IEaasiSearchResponse<IEaasiRole>>(url);
		if (!res.ok) return null;
		return res.result;
	}

	/* OAI-PMH Harvesters
	============================================*/

	async getHarvesters(): Promise<string[]> {
		let res = await this.get<string[]>('/admin/get-harvesters');
		if(!res.ok) return null;
		return res.result;
	}

	async addHarvester(req: IAddHarvesterRequest): Promise<boolean> {
		let res = await this.post<boolean>('/admin/add-harvester', req);
		return res.ok;
	}

	async syncHarvester(name: string, full: boolean = false): Promise<IHarvesterSyncResult> {
		let url = `/admin/sync-harvester/?name=${name}`;
		if(full) url += '&full=true';
		let res = await this.post<IHarvesterSyncResult>(url, null);
		return res.result;
	}

	async deleteHarvester(name: string): Promise<boolean> {
		let res = await this.post<boolean>(`/admin/delete-harvester/?name=${name}`, null);
		return res.ok;
	}

	/* Error Logs
	============================================*/
	async getErrorLogs(): Promise<IApplicationLog[]> {
		const response = await this.get<IApplicationLog[]>('/error-report/get-all');
		if (!response.ok) return [];
		return response.result;
	}

	async getMostRecentErrorLogs(): Promise<IApplicationLog[]> {
		const response = await this.get<IApplicationLog[]>('/error-report/get-most-recent');
		if (!response.ok) return [];
		return response.result;
	}

}

export default new AdminService();