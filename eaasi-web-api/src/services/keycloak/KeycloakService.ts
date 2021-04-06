import HttpJSONService from '@/services/base/HttpJSONService';
import BaseService from '@/services/base/BaseService';
import { KEYCLOAK_CLIENT_UUID, KEYCLOAK_REALM, KEYCLOAK_URL } from '@/config/keycloak-config';
import CrudQuery from '@/classes/CrudQuery';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';
import { INewUser } from '@/types/admin/User';

export default class KeycloakService extends BaseService {
	private readonly _httpService: HttpJSONService;
    
	constructor() {
		super();
		this._httpService = new HttpJSONService();
	}

	async getUserInfo(token: string) {
		const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;

		return await this._httpService.get(url, null, token);
	}

	async getUsers(query: CrudQuery, token: string, callback: Function) {
		let keycloakQuery = new KeycloakUserQuery(query);
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users?${keycloakQuery.constructQueryString()}`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async findUsers(query: KeycloakUserQuery, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users?${query.constructQueryString()}`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getUsersCount(token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/count`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async createUser(data: INewUser, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`;

		return await this._httpService.post(url, data, null, token).then(res => callback(res));
	}

	async updateUser(id: string, data: INewUser, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${id}`;

		return await this._httpService.put(url, data, null, token).then(res => callback(res));
	}

	async getRoles(token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/clients/${KEYCLOAK_CLIENT_UUID}/roles`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async assignRoles(userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/clients/${KEYCLOAK_CLIENT_UUID}`;

		return await this._httpService.post(url, roles, null, token).then(res => callback(res));
	}

	async removeRolesFromUser(userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/clients/${KEYCLOAK_CLIENT_UUID}`;

		return await this._httpService.delete(url, roles, null, token).then(res => callback(res));
	}

}