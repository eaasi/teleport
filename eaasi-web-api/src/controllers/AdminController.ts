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

		try {
			let users = await this._keycloakService.getUsers(query, req.headers.authorization, this._handleApiResponse.bind(null, res));
			let count = await this._keycloakService.getUsersCount(req.headers.authorization, this._handleApiResponse.bind(null, res));
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
			await this._keycloakService.createUser(req.body, req.headers.authorization, this._handleApiResponse.bind(null, res));

			let query = new KeycloakUserQuery();
			query.username = req.body.username;
			let users = await this._keycloakService.findUsers(query, req.headers.authorization, this._handleApiResponse.bind(null, res));
			if (!users || users.length === 0) {
				res.status(404);
				return res.send({error: 'Created user not found'});
			}
			let userId = users[0].id;

			let roles = await this._keycloakService.getRoles(req.headers.authorization, this._handleApiResponse.bind(null, res));
			let role = roles.find(role => role.name === req.body.attributes.role[0]);

			await this._keycloakService.assignRoles(userId, [role], req.headers.authorization, this._handleApiResponse.bind(null, res));
			return res.send(true);
		} catch (e) {
			return this.sendError(e, res);
		}
	}

	async updateUser(req: ExpressRequest, res: ExpressResponse) {
		const userId = req.query.userId as string;
		await this._keycloakService.updateUser(userId, req.body, req.headers.authorization, this._handleApiResponse.bind(null, res));

		const roleUpdated = req.query.roleUpdated;
		if (roleUpdated) {
			let roles = await this._keycloakService.getRoles(req.headers.authorization, this._handleApiResponse.bind(null, res));
			let role = roles.find(role => role.name === req.body.attributes.role[0]);

			await this._keycloakService.removeRolesFromUser(userId, roles, req.headers.authorization, this._handleApiResponse.bind(null, res));
			await this._keycloakService.assignRoles(userId, [role], req.headers.authorization, this._handleApiResponse.bind(null, res));
		}

		return res.send(true);
	}

	/**
	 * Deletes User
	 * @param req - Express request
	 * @param res - Express response
	 */
	async deleteUser(req: ExpressRequest, res: ExpressResponse) {
		/*try {
			let id = Number(req.query.id);
			if (!SAML_ENABLED) {
				await this._userHashService.deleteUserHash(id);
			}
			await this._userSvc.deleteUser(id);
			res.send(true);
		} catch(e) {
			return this.sendError(e, res);
		}*/
	}

	/**
	 * Reset User Password
	 * @param req - Express request
	 * @param res - Express response
	 */
	async resetUserPassword(req: ExpressRequest, res: ExpressResponse) {
		/*if (SAML_ENABLED) {
			res.status(500);
			return res.send('Invalid endpoint');
		}
		try {
			const { email } = req.body;
			const user = await this._userSvc.getUserByEmail(email);
			const plainUser = user.get({ plain: true }) as IEaasiUser;
			const password = this.generatePassword();
			const hash = await this._authService.createUserHash(password);
			const userHash: IEaasiUserHash = { hash, userId: plainUser.id };
			const updatedUserHash = await this._userHashService.saveUserHash(userHash);
			const mailPayload: IMailPayload = {
				password,
				receiver: email
			}
			const mailResponse = await this._mailerService.sendMail(MailerAction.PasswordReset, mailPayload);
			if (mailResponse.accepted.length > 0) {
				return res.send(true);
			}
			res.status(500);
			res.send(false);
		} catch(e) {
			return this.sendError(e, res);
		}*/
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
			let list = await this._harvesterSvc.getHarvesters();
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
			let success = await this._harvesterSvc.addHarvester(data);
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
			let result = await this._harvesterSvc.syncHarvester(name, !!full);
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
			let success = await this._harvesterSvc.deleteHarvester(name);
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
			const result = await this._adminService.getApiKey();
			return res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async _handleApiResponse(res: ExpressResponse, apiResponse: Response) {
		if (!apiResponse.ok) {
			let error = await apiResponse.text();
			res.status(apiResponse.status);
			res.send(error);
			throw new Error(error);
		}
		if ([201, 204].includes(apiResponse.status)) {
			return null;
		} else {
			return await apiResponse.json();
		}
	}

}
