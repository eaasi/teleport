import EmilAdminService from '@/services/admin/EmilAdminService';
import EmulatorAdminService from '@/services/admin/EmulatorAdminService';
import UserAdminService from '@/services/admin/UserAdminService';
import AuthService from '@/services/auth/AuthService';
//import UserHashService from '@/services/auth/UserHashService';
import MailerService from '@/services/mailer/MailerService';
import HarvesterService from '@/services/oaipmh/HarvesterService';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';
import { HarvesterReq } from '@/types/oaipmh/Harvester';
import { Request as ExpressRequest, Response as ExpressResponse}  from 'express';
import BaseController from './base/BaseController';
import KeycloakService from '@/services/keycloak/KeycloakService';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';
import { Response } from 'node-fetch';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_400_response } from '@/utils/error-helpers';
import ErrorResponse from '@/classes/ErrorResponse';

const SAML_ENABLED = process.env.SAML_ENABLED == 'True' || process.env.SAML_ENABLED == 'true';

export default class AdminController extends BaseController {

	readonly _userSvc: UserAdminService;
	readonly _emulatorAdminSvc: EmulatorAdminService;
	readonly _harvesterSvc: HarvesterService;
	//readonly _userHashService: UserHashService;
	readonly _authService: AuthService;
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
			//this._userHashService = new UserHashService();
			this._authService = new AuthService();
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
			let users = await this._keycloakService.getUsers(query, groupId, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			let count = await this._keycloakService.getUsersCount(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			res.send({
				result: users,
				totalResults: count
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
			const password = this.generatePassword();
			userData.credentials = [{
				type: 'password',
				value: password,
				temporary: true
			}];
			userData.enabled = true;
			await this._keycloakService.createUser(req.body, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			let query = new KeycloakUserQuery();
			query.username = req.body.username;
			let users = await this._keycloakService.findUsers(query, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			if (!users || users.length === 0) {
				res.status(HttpResponseCode.NOT_FOUND);
				return res.send(new ErrorResponse(HttpResponseCode.NOT_FOUND, 'Created user not found'));
			}
			let userId = users[0].id;

			let clientRoles = await this._keycloakService.getClientRoles(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			let clientRole = clientRoles.find(role => role.name === req.body.attributes.role[0]);
			await this._keycloakService.assignClientRoles(userId, [clientRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

			if (req.body.realmRoles && req.body.realmRoles.length > 0) {
				let realmRoles = await this._keycloakService.getRealmRoles(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				let realmRole = realmRoles.find(role => role.name === req.body.realmRoles[0]);
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
				let clientRoles = await this._keycloakService.getClientRoles(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				let clientRole = clientRoles.find(role => role.name === req.body.attributes.role[0]);

				await this._keycloakService.removeClientRolesFromUser(userId, clientRoles, req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
				await this._keycloakService.assignClientRoles(userId, [clientRole], req.headers.authorization, this._handleKeycloakResponse.bind(null, res));

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
			const password = this.generatePassword();
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

	private generatePassword(length: number = 8) {
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
			let emulators = await this._emulatorAdminSvc.getEmulators();
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
			let entry = req.body as EmulatorEntry;
			let response = await this._emulatorAdminSvc.setDefaultVersion(entry);
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
			let groups = await this._keycloakService.getGroups(req.headers.authorization, this._handleKeycloakResponse.bind(null, res));
			let group = groups.find(group => group.name === groupName);
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
