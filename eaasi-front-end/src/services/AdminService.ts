import config from '@/config';
import EmulatorImportRequest from '@/models/admin/EmulatorImportRequest';
import User from '@/models/admin/User';
import { IApplicationLog } from '@/types/ApplicationLog';
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
		const res = await this.get<IEmulator[]>('/admin/get-emulators');
		if (!res.ok) return null;
		return res.result;
	}

	async importEmulator(req: EmulatorImportRequest): Promise<ITaskState> {
		const res = await this.post('/admin/import-emulator', req);
		if (!res.ok) return null;
		return res.result as ITaskState;
	}

	async setDefaultEmulatorVersion(id: string) {
		const res = await this.post<any>(`/admin/set-default-emulator-version?id=${id}`);
		if (!res.ok) return null;
		return res.result;
	}

	/* Users
	============================================*/

	async getUsers(query: IEaasiSearchQuery, group: string): Promise<IEaasiSearchResponse<User>> {
		let url = this.createQueryUrl('/admin/users/list', query);
		url += `&groupId=${group}`;
		const res = await this.get<IEaasiSearchResponse<User>>(url);
		if (!res.ok) return null;
		return res.result;
	}

	async saveUser(user: User, groupId: string): Promise<string> {
		const res = await this.post<any>(`/admin/users/create?groupId=${groupId}`, user.toKeycloakUserInfo(), {suppressErrors: true});
		if (!res.ok) {
			const error = await res.json();
			eventBus.$emit('notification:show', generateNotificationError(error.message));
		}
		return res.result.password;
	}

	async saveExistingUser(user: User, roleUpdated: boolean, groupId: string): Promise<any> {
		const res = await this.post(`/admin/users/update?userId=${user.id}&roleUpdated=${roleUpdated}&groupId=${groupId}`, user.toKeycloakUserInfo(), {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return true;
	}

	async deleteUser(id: string, groupId: string): Promise<any> {
		const res = await this.post(`/admin/users/delete?userId=${id}&groupId=${groupId}`, {}, {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return true;
	}

	async resetUserPassword(id: string, email: string, groupId: string): Promise<any> {
		const res = await this.post<any>(`/admin/users/reset-password?userId=${id}&groupId=${groupId}`, { email }, {suppressErrors: true});
		if (!res.ok) {
			return await res.json();
		}
		return res.result.password;
	}

	/* User Roles
	============================================*/

	async getRoles(): Promise<IEaasiSearchResponse<IEaasiRole>>  {
		const url = this.createQueryUrl('/admin/users/roles');
		const res = await this.get<IEaasiSearchResponse<IEaasiRole>>(url);
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

	async getBEBuildVersion() {
		const response = await this.getLocal<any>('/emil/admin/build-info');
		if (!response.ok) return [];
		return response.result.version;
	}

}

export default new AdminService();