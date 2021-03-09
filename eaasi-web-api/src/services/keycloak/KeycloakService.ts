import HttpJSONService from '@/services/base/HttpJSONService';
import BaseService from '@/services/base/BaseService';
import { KEYCLOAK_REALM, KEYCLOAK_URL } from '@/config/keycloak-config';

export default class KeycloakService extends BaseService {
	private readonly _httpService: HttpJSONService;
    
	constructor() {
		super();
		this._httpService = new HttpJSONService();
	}

	async getUserInfo(authorization: string) {
		const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;
		const options = {
			headers: {
				Authorization: authorization,
			},
		};

		return await this._httpService.get(url, options);
	}

}