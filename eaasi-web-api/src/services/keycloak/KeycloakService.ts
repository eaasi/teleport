import HttpJSONService from '@/services/base/HttpJSONService';
import BaseService from '@/services/base/BaseService';
import { KEYCLOAK_REALM, KEYCLOAK_URL } from '@/config/keycloak-config';
import CrudQuery from '@/classes/CrudQuery';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';

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
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users?${keycloakQuery.constructQueryString()}`;

		return await this._httpService.get(url, null, token);
	}

	async getUsersCount(token: string) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/count`;

		return await this._httpService.get(url, null, token);
	}

}