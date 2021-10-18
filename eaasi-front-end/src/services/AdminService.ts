import config from '@/config';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import { IApplicationLog } from '@/types/ApplicationLog';
import { IAddHarvesterRequest, IHarvesterSyncResult } from '@/types/Harvesters';
import { IEaasiSearchQuery, IEaasiSearchResponse } from '@/types/Search';
import { ITaskState } from '@/types/Task';
import {IEaasiRole, IEmulator, IKeyboardSettings} from 'eaasi-admin';
import Cookies from 'js-cookie';
import BaseHttpService from './BaseHttpService';
import eventBus from '@/utils/event-bus';
import { generateNotificationError } from '@/helpers/NotificationHelper';

class AdminService extends BaseHttpService {

	private readonly _defaultKeyboardSetting: IKeyboardSettings = {
		language: {
			name: 'us',
			descriptions: ''
		},
		layout: {
			descriptions: '',
			name: '',
			vendor: ''
		}
	};

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

	async setDefaultEmulatorVersion(id: string) {
		let res = await this.post<any>(`/admin/set-default-emulator-version?id=${id}`);
		if (!res.ok) return null;
		return res.result;
	}

	/* Users
	============================================*/

	async getUsers(query: IEaasiSearchQuery, group: string): Promise<IEaasiSearchResponse<User>> {
		let url = this.createQueryUrl('/admin/users/list', query);
		url += `&groupId=${group}`;
		let res = await this.get<IEaasiSearchResponse<User>>(url);
		if (!res.ok) return null;
		return res.result;
	}

	async saveUser(user: User, groupId: string): Promise<string> {
		let res = await this.post<any>(`/admin/users/create?groupId=${groupId}`, user.toKeycloakUserInfo(), {suppressErrors: true});
		if (!res.ok) {
			const error = await res.json();
			eventBus.$emit('notification:show', generateNotificationError(error.message));
		}
		return res.result.password;
	}

	async saveExistingUser(user: User, roleUpdated: boolean, groupId: string): Promise<any> {
		let res = await this.post(`/admin/users/update?userId=${user.id}&roleUpdated=${roleUpdated}&groupId=${groupId}`, user.toKeycloakUserInfo(), {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return true;
	}

	async deleteUser(id: string, groupId: string): Promise<any> {
		let res = await this.post(`/admin/users/delete?userId=${id}&groupId=${groupId}`, {}, {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return true;
	}

	async resetUserPassword(id: string, email: string, groupId: string): Promise<any> {
		let res = await this.post<any>(`/admin/users/reset-password?userId=${id}&groupId=${groupId}`, { email }, {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return res.result.password;
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

	async updateHarvester(name: string, req: IAddHarvesterRequest): Promise<boolean> {
		let res = await this.put<boolean>(`/admin/update-harvester/?name=${name}`, req);
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

	async getHarvester(name: string): Promise<IAddHarvesterRequest> {
		let res = await this.get<IAddHarvesterRequest>(`/admin/get-harvester/?name=${name}`, null);
		if (!res.ok) return null;
		return res.result;
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

	getKeyboardSettings(): IKeyboardSettings {
		const keyboardSettigs = Cookies.get(config.KEYBOARD_SETTINGS_NAME);
		if (!keyboardSettigs) return this._defaultKeyboardSetting;
		return JSON.parse(keyboardSettigs) as IKeyboardSettings;
	}

	setKeyboardSettings(settings: IKeyboardSettings) {
		Cookies.set(config.KEYBOARD_SETTINGS_NAME, JSON.stringify(settings));
	}

	async dbDataMigration() {
		const response = await this.get<any>('/admin/db-migration');
		if (!response.ok) return null;
		return response.result;
	}
	async syncEnvironments() {
		const response = await this.get<any>('/admin/sync-environments');
		if (!response.ok) return null;
		return response.result;
	}

	async getApiKey() {
		const response = await this.get<any>('/admin/api-key');
		if (!response.ok) return null;
		return response.result;
	}

	async getGroupInfo(name: string) {
		const response = await this.get<any>(`/admin/groups/${name}`);
		if (!response.ok) return null;
		return response.result;
	}

}

export default new AdminService();