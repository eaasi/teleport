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
import { Request, Response } from 'express';
import BaseController from './base/BaseController';
import KeycloakService from '@/services/keycloak/KeycloakService';
import KeycloakUserQuery from '@/classes/KeycloakUserQuery';

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
	async getUsers(req: Request, res: Response) {

		// Parse request object to unpack limit, page, etc.
		let query = this._getQueryFromParams(req);

		try {
			let usersResponse = await this._keycloakService.getUsers(query, req.headers.authorization);
			let usersCountResponse = await this._keycloakService.getUsersCount(req.headers.authorization);

			if (!usersResponse.ok) {
				res.status(usersResponse.status)
			} else if (!usersCountResponse.ok) {
				res.status(usersCountResponse.status);
			} else {
				let users = await usersResponse.json();
				let count = await usersCountResponse.json();
				res.send({
					result: users,
					totalResults: count
				});
			}
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Gets all user roles
	 * @param _req - Express request
	 * @param res - Express response
	 */
	async getRoles(_req: Request, res: Response) {
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
	async createUser(req: Request, res: Response) {
		try {
			let creationResponse = await this._keycloakService.createUser(req.body, req.headers.authorization);
			if (!creationResponse.ok) {
				res.status(creationResponse.status);
				return res.send(await creationResponse.json());
			}
			let query = new KeycloakUserQuery();
			query.username = req.body.username;
			let userResponse = await this._keycloakService.findUsers(query, req.headers.authorization);
			if (!userResponse.ok) {
				res.status(userResponse.status);
				return res.send(await userResponse.json());
			}
			let foundUsers = await userResponse.json();
			if (!foundUsers || foundUsers.length === 0) {
				res.status(404);
				return res.send({error: 'Created user not found'});
			}
			let userId = foundUsers[0].id;
			let rolesResponse = await this._keycloakService.getRoles(req.headers.authorization);
			if (!rolesResponse.ok) {
				res.status(rolesResponse.status);
				return res.send(await rolesResponse.json());
			}
			let roles = await rolesResponse.json();
			let role = roles.find(role => role.name === req.body.attributes.role[0]);

			let assignRoleResponse = await this._keycloakService.assignRole(userId, [role], req.headers.authorization);
			if (!assignRoleResponse.ok) {
				res.status(assignRoleResponse.status);
				return res.send(await assignRoleResponse.json());
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
	async deleteUser(req: Request, res: Response) {
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
	async resetUserPassword(req: Request, res: Response) {
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
	async getEmulators(req: Request, res: Response) {
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
	async importEmulator(req: Request, res: Response) {
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
	async setDefaultEmulatorVersion(req: Request, res: Response) {
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
	async getHarvesters(req: Request, res: Response) {
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
	async addHarvester(req: Request, res: Response) {
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
	async syncHarvester(req: Request, res: Response) {
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
	async deleteHarvester(req: Request, res: Response) {
		try {
			const name = req.query.name as string;
			let success = await this._harvesterSvc.deleteHarvester(name);
			if(success) return res.send(true);
			return this.sendError(new Error(`Could not delete oai-pmh harvester: ${name}`), res);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async dbDataMigration(req: Request, res: Response) {
		try {
			// TODO: add call to _environmentService.dbDataMigration() which should send a GET request to /emil/environment-repository/db-migration
			res.send(true);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async syncEnvironments(req: Request, res: Response) {
		try {
			let result = true;
			// TODO: add call to _environmentService.dbDataMigration() which should send a GET request to /emil/environment-repository/actions/sync
			res.send(result)
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async getApiKey(req: Request, res: Response) {
		try {
			const result = await this._adminService.getApiKey();
			return res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

}
