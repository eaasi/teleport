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

	async getUsers(query: CrudQuery, token: string) {
		let keycloakQuery = new KeycloakUserQuery(query);

		return await this.findUsers(keycloakQuery, token);
	}

	async findUsers(query: KeycloakUserQuery, token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users?${query.constructQueryString()}`;

		return await this._httpService.get(url, null, token);
	}

	async getUsersCount(token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/count`;

		return await this._httpService.get(url, null, token);
	}

	async createUser(data: INewUser, token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users`;

		return await this._httpService.post(url, data, null, token);
	}

	async getRoles(token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/clients/${KEYCLOAK_CLIENT_UUID}/roles`;

		return await this._httpService.get(url, null, token);
	}

	async assignRole(userId: string, role: object, token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/clients/${KEYCLOAK_CLIENT_UUID}`;

		return await this._httpService.post(url, role, null, token);
	}

}