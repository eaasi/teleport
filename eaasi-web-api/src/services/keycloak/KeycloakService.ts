import HttpJSONService from '@/services/base/HttpJSONService';
import BaseService from '@/services/base/BaseService';
import { KEYCLOAK_REALM, KEYCLOAK_URL, KEYCLOAK_CLIENT_ID } from '@/config/keycloak-config';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';
import { INewGroup, INewUser } from '@/types/admin/User';
import { URLSearchParams } from 'url';
import fetch, { Response } from 'node-fetch';

export default class KeycloakService extends BaseService {
	private readonly _httpService: HttpJSONService;

	constructor() {
		super();
		this._httpService = new HttpJSONService();
	}

	async defaultHandler(response: Response) {
		if (!response.ok) {
			return null;
		}
		return await response.json();
	}

	async getUserTokens(username: string, password: string) {
		const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				'grant_type': 'password',
				'client_id': KEYCLOAK_CLIENT_ID,
				'username': username,
				'password': password,
			}),
		};

		const response = await fetch(url, options);
		return await response.json();
	}

	async getUserInfo(token: string) {
		const url = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/userinfo`;

		return await this._httpService.get(url, null, token);
	}

	async getUsers(query: KeycloakUserQuery, groupId: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/groups/${groupId}/members?${query.constructQueryString()}`;
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

	async deleteUser(id: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${id}`;

		return await this._httpService.delete(url, null, null, token).then(res => callback(res));
	}

	async resetUserPassword(id: string, password: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${id}/reset-password`;
		const data = {
			type: 'password',
			value: password,
			temporary: true,
		};

		return await this._httpService.put(url, data, null, token)
			.then(res => callback(res));
	}

	async getClientRoles(clientUUID: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/clients/${clientUUID}/roles`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getUser(userId: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getRealmRoles(token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/roles`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async assignClientRoles(clientUUID: string, userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/clients/${clientUUID}`;

		return await this._httpService.post(url, roles, null, token).then(res => callback(res));
	}

	async assignRealmRoles(userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/realm`;

		return await this._httpService.post(url, roles, null, token).then(res => callback(res));
	}

	async removeClientRolesFromUser(clientUUID: string, userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/clients/${clientUUID}`;

		return await this._httpService.delete(url, roles, null, token).then(res => callback(res));
	}

	async removeRealmRolesFromUser(userId: string, roles: object, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/role-mappings/realm`;

		return await this._httpService.delete(url, roles, null, token).then(res => callback(res));
	}

	async getGroups(token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/groups`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getGroup(name: string, token: string, callback: Function) {
		const query = `search=${encodeURIComponent(name)}`;
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/groups?${query}`;
		const groups = await this._httpService.get(url, null, token).then(res => callback(res));
		return groups.find(group => group.name === name);
	}

	async createGroup(group: INewGroup, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/groups`;
		return await this._httpService.post(url, group, null, token)
			.then(res => callback(res));
	}

	async getGroupById(id: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/groups/${id}`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async addUserToGroup(userId: string, groupId: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/groups/${groupId}`;

		return await this._httpService.put(url, null, null, token).then(res => callback(res));
	}

	async getUserGroups(userId: string, token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/users/${userId}/groups`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getClients(token: string, callback: Function) {
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/clients`;

		return await this._httpService.get(url, null, token).then(res => callback(res));
	}

	async getClient(cid: string, token: string, callback: Function) {
		const query = `clientId=${encodeURIComponent(cid)}`;
		const url = `${KEYCLOAK_URL}/admin/realms/${KEYCLOAK_REALM}/clients?${query}`;
		const clients =  await this._httpService.get(url, null, token).then(res => callback(res));
		return clients.find(client => client.clientId === cid);
	}

	async getOrganizationNameByUserId(userId: string, token: string) {
		let groups = await this.getUserGroups(userId, token, this.defaultHandler);
		if (!groups || groups.length == 0) {
			return null;
		}
		let groupId = groups[0].id;
		let group = await this.getGroupById(groupId, token, this.defaultHandler);
		return group && group.attributes && group.attributes.orgname && group.attributes.orgname.length > 0 ?
			group.attributes.orgname[0] : null;
	}

	async getOwnerLabel(ownerId: string, token: string) {
		let orgName = await this.getOrganizationNameByUserId(ownerId, token);
		if (!orgName) {
			return null;
		}
		let ownerLabel = orgName;
		let user = await this.getUser(ownerId, token, this.defaultHandler);
		if (user) {
			ownerLabel = (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username) + ' (' + ownerLabel + ')';
		}
		return ownerLabel;
	}
}