import EmilAdminService from '@/services/admin/EmilAdminService';
import EmulatorAdminService from '@/services/admin/EmulatorAdminService';
import UserAdminService from '@/services/admin/UserAdminService';
import MailerService from '@/services/mailer/MailerService';
import HarvesterService from '@/services/oaipmh/HarvesterService';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { HarvesterReq } from '@/types/oaipmh/Harvester';
import { Request as ExpressRequest, Response as ExpressResponse}  from 'express';
import BaseController from './base/BaseController';
import KeycloakService from '@/services/keycloak/KeycloakService';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';
import { Response } from 'node-fetch';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_400_response } from '@/utils/error-helpers';
import ErrorResponse from '@/classes/ErrorResponse';
import { KEYCLOAK_CLIENT_ID } from '@/config/keycloak-config';

const SAML_ENABLED = process.env.SAML_ENABLED == 'True' || process.env.SAML_ENABLED == 'true';

export default class AdminController extends BaseController {

	readonly _userSvc: UserAdminService;
	readonly _emulatorAdminSvc: EmulatorAdminService;
	readonly _harvesterSvc: HarvesterService;
	readonly _mailerService: MailerService;
	readonly _adminService: EmilAdminService;
	private readonly _keycloakService: KeycloakService;

	constructor() {
		super();
		this._userSvc = new UserAdminService();
		this._emulatorAdminSvc = new EmulatorAdminService();
		this._adminService = new EmilAdminService();
		this._harvesterSvc = new HarvesterService();
		this._keycloakService = new KeycloakService();
		if (!SAML_ENABLED) {
			this._mailerService = new MailerService();
		}
	}

	/*============================================================
	 == Users
	/============================================================*/

	/**
	 * Gets a paginated user list
	 * @param req - Express request
	 * @param res - Express response
	 */
	async getUsers(req: ExpressRequest, res: ExpressResponse) {

		// Parse request object to unpack limit, page, etc.
		let query = this._getQueryFromParams(req);
		let groupId = req.query.groupId as string;

		try {
			// NOTE: Keycloak does not support server-side countig of members in a specific group.
			//       Hence, always request all group's members, count and return expected subset!

			let limits = new KeycloakUserQuery();
			limits.first = 0;
			limits.max = -1;

			let users = await this._keycloakService.getUsers(limits, groupId, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			limits = new KeycloakUserQuery(query);
			res.send({
				result: users.slice(limits.first, limits.max),
				totalResults: users.length
			});
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Gets all user roles
	 * @param _req - Express request
	 * @param res - Express response
	 */
	async getRoles(_req: ExpressRequest, res: ExpressResponse) {
		try {
			let roles = await this._userSvc.getRoles();
			res.send(roles);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Adds user record
	 * @param req - Express request
	 * @param res - Express response
	 */
	async createUser(req: ExpressRequest, res: ExpressResponse) {
		try {
			let userData = req.body;
			if (!userData) {
				res.status(HttpResponseCode.BAD_REQUEST);
				return res.send(build_400_response(userData));
			}
			const password = AdminController.generatePassword();
			userData.credentials = [{
				type: 'password',
				value: password,
				temporary: true
			}];
			userData.enabled = true;
			await this._keycloakService.createUser(userData, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			let query = new KeycloakUserQuery();
			query.username = userData.username;
			let users = await this._keycloakService.findUsers(query, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			if (!users || users.length === 0) {
				res.status(HttpResponseCode.NOT_FOUND);
				return res.send(new ErrorResponse(HttpResponseCode.NOT_FOUND, 'Created user not found'));
			}
			let userId = users[0].id;
			const clientUUID = await this._getClientUUID(req, res);
			let clientRoles = await this._keycloakService.getClientRoles(clientUUID, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			let clientRole = clientRoles.find(role => role.name === userData.attributes.role[0]);
			await this._keycloakService.assignClientRoles(clientUUID, userId, [clientRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			if (userData.realmRoles && userData.realmRoles.length > 0) {
				let realmRoles = await this._keycloakService.getRealmRoles(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				let realmRole = realmRoles.find(role => role.name === userData.realmRoles[0]);
				await this._keycloakService.assignRealmRoles(userId, [realmRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			}

			let groupId = req.query.groupId as string;
			await this._keycloakService.addUserToGroup(userId, groupId, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			return res.send({password});
		} catch (e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Updates user record
	 * @param req - Express request
	 * @param res - Express response
	 */
	async updateUser(req: ExpressRequest, res: ExpressResponse) {
		try {
			if (!await this._checkGroup(req, res)) {
				res.status(HttpResponseCode.BAD_REQUEST);
				return res.send(new ErrorResponse(HttpResponseCode.BAD_REQUEST, 'Only users from your organization can be updated'));
			}

			const userId = req.query.userId as string;
			await this._keycloakService.updateUser(userId, req.body, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			const roleUpdated = req.query.roleUpdated;
			if (roleUpdated) {
				const clientUUID = await this._getClientUUID(req, res);

				let clientRoles = await this._keycloakService.getClientRoles(clientUUID, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				let clientRole = clientRoles.find(role => role.name === req.body.attributes.role[0]);


				await this._keycloakService.removeClientRolesFromUser(clientUUID, userId, clientRoles, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				await this._keycloakService.assignClientRoles(clientUUID, userId, [clientRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

				let realmRoles = await this._keycloakService.getRealmRoles(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				let realmRole = realmRoles.find(role => role.name === 'admin');
				if (req.body.realmRoles && req.body.realmRoles.length > 0) {
					await this._keycloakService.assignRealmRoles(userId, [realmRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				} else {
					await this._keycloakService.removeRealmRolesFromUser(userId, [realmRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				}
			}

			return res.send(true);
		} catch (e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Deletes User
	 * @param req - Express request
	 * @param res - Express response
	 */
	async deleteUser(req: ExpressRequest, res: ExpressResponse) {
		try {
			if (!await this._checkGroup(req, res)) {
				res.status(HttpResponseCode.BAD_REQUEST);
				return res.send(new ErrorResponse(HttpResponseCode.BAD_REQUEST, 'Only users from your organization can be deleted'));
			}
			const userId = req.query.userId as string;
			await this._keycloakService.deleteUser(userId, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			res.send(true);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Reset User Password
	 * @param req - Express request
	 * @param res - Express response
	 */
	async resetUserPassword(req: ExpressRequest, res: ExpressResponse) {
		try {
			if (!await this._checkGroup(req, res)) {
				res.status(HttpResponseCode.BAD_REQUEST);
				return res.send(new ErrorResponse(HttpResponseCode.BAD_REQUEST, 'Password can be reset only for users from your organization'));
			}
			const userId = req.query.userId as string;
			const password = AdminController.generatePassword();
			const userData = {
				credentials: [{
					type: 'password',
					value: password,
					temporary: true
				}]
			};
			await this._keycloakService.updateUser(userId, userData, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			res.send({password});
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	static generatePassword(length: number = 16) {
		const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (var i = 0, n = charset.length; i < length; ++i) {
			result += charset.charAt(Math.floor(Math.random() * n));
		}
		return result;
	}

	/*============================================================
	 == Emulators
	/============================================================*/

	/**
	 * Gets the list of emulators
	 * @param req - Express request
	 * @param res - Express response
	 */
	async getEmulators(req: ExpressRequest, res: ExpressResponse) {
		try {
			let token = req.headers.authorization;
			let emulators = await this._emulatorAdminSvc.getEmulators(token);
			res.send(emulators);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Gets the list of emulators
	 * @param req - Express request
	 * @param res - Express response
	 */
	async importEmulator(req: ExpressRequest, res: ExpressResponse) {
		try {
			let importRequest = req.body as IEmulatorImportRequest;
			let taskState = await this._emulatorAdminSvc.importEmulator(importRequest);
			res.send(taskState);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Sets the default emulator image version
	 * @param req - Express request
	 * @param res - Express response
	 */
	async setDefaultEmulatorVersion(req: ExpressRequest, res: ExpressResponse) {
		try {
			let id = req.query.id as string;
			let token = req.headers.authorization;
			let response = await this._emulatorAdminSvc.setDefaultVersion(id, token);
			res.send(response);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/*============================================================
	 == OAI-PMH Harvesters
	/============================================================*/

	/**
	 * Get list of all known oai-pmh harvesters
	 * @param req - Express request
	 * @param res - Express response
	 */
	async getHarvesters(req: ExpressRequest, res: ExpressResponse) {
		try {
			let token = req.headers.authorization;
			let list = await this._harvesterSvc.getHarvesters(token);
			res.send(list);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Adds aq new oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async addHarvester(req: ExpressRequest, res: ExpressResponse) {
		try {
			let data = req.body as HarvesterReq;
			let token = req.headers.authorization;
			let success = await this._harvesterSvc.addHarvester(data, token);
			if(success) return res.send(true);
			return this.sendError(new Error('Could not add new oai-pmh harvester'), res);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Updates exiting oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async updateHarvester(req: ExpressRequest, res: ExpressResponse) {
		try {
			let name = req.query.name as string;
			let data = req.body as HarvesterReq;
			let token = req.headers.authorization;
			let success = await this._harvesterSvc.deleteHarvester(name, token);
			if (success) {
				success = await this._harvesterSvc.addHarvester(data, token);
			}
			if(success) return res.send(true);
			return this.sendError(new Error('Could not update oai-pmh harvester'), res);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Syncs an existing oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async syncHarvester(req: ExpressRequest, res: ExpressResponse) {
		try {
			const name = req.query.name as string;
			const full = req.query.full;
			const token = req.headers.authorization;
			let result = await this._harvesterSvc.syncHarvester(name, !!full, token);
			res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Deletes an existing oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async deleteHarvester(req: ExpressRequest, res: ExpressResponse) {
		try {
			const name = req.query.name as string;
			const token = req.headers.authorization;
			let success = await this._harvesterSvc.deleteHarvester(name, token);
			if(success) return res.send(true);
			return this.sendError(new Error(`Could not delete oai-pmh harvester: ${name}`), res);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Gets an existing oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async getHarvester(req: ExpressRequest, res: ExpressResponse) {
		try {
			const name = req.query.name as string;
			const token = req.headers.authorization;
			let result = await this._harvesterSvc.getHarvester(name, token);
			if (result) return res.send(result);
			return this.sendError(new Error(`Could not find oai-pmh harvester: ${name}`), res);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async dbDataMigration(req: ExpressRequest, res: ExpressResponse) {
		try {
			// TODO: add call to _environmentService.dbDataMigration() which should send a GET request to /emil/environment-repository/db-migration
			res.send(true);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async syncEnvironments(req: ExpressRequest, res: ExpressResponse) {
		try {
			let result = true;
			// TODO: add call to _environmentService.dbDataMigration() which should send a GET request to /emil/environment-repository/actions/sync
			res.send(result)
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async getApiKey(req: ExpressRequest, res: ExpressResponse) {
		try {
			const token = req.headers.authorization;
			const result = await this._adminService.getApiKey(token);
			return res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async getGroup(req: ExpressRequest, res: ExpressResponse) {
		try {
			const groupName = req.params.name;
			let group = await this._keycloakService.getGroup(groupName, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			if (!group || !group.id) {
				res.status(HttpResponseCode.NOT_FOUND);
				return res.send(new ErrorResponse(HttpResponseCode.NOT_FOUND, `Group ${groupName} not found`));
			}
			res.send(group);
		} catch (e) {
			return this.sendError(e, res);
		}
	}

	async _checkGroup(req: ExpressRequest, res: ExpressResponse) {
		const userId = req.query.userId as string;
		const groupId = req.query.groupId as string;

		let userGroups = await this._keycloakService.getUserGroups(userId, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
		let group = userGroups.find(group => group.id === groupId);
		return !!group;
	}

	async _getClientUUID(req: ExpressRequest, res: ExpressResponse) {
		let client = await this._keycloakService.getClient(KEYCLOAK_CLIENT_ID, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
		if (client) {
			return client.id;
		} else {
			res.status(HttpResponseCode.NOT_FOUND);
			res.send(new ErrorResponse(HttpResponseCode.NOT_FOUND, `Client ${KEYCLOAK_CLIENT_ID} not found`));
			throw new Error(`Client ${KEYCLOAK_CLIENT_ID} not found`);
		}
	}

	async _handleKeycloakResponse(res: ExpressResponse, apiResponse: Response) {
		if (!apiResponse.ok) {
			let error = await apiResponse.json();
			res.status(apiResponse.status);
			res.send(new ErrorResponse(apiResponse.status, error.errorMessage));
			throw new Error(error.errorMessage);
		}
		if ([HttpResponseCode.CREATED, HttpResponseCode.NO_CONTENT].includes(apiResponse.status)) {
			return null;
		} else {
			return await apiResponse.json();
		}
	}

}
