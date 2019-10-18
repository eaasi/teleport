import { Request, Response } from 'express';
import BaseController from './base/BaseController';
import EmulatorAdminService from '@/services/admin/EmulatorAdminService';
import UserAdminService from '@/services/admin/UserAdminService';
import HarvesterService from '@/services/eaas/oaipmh/HarvesterService';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';
import { HarvesterReq } from '@/types/oaipmh/Harvester';

export default class AdminController extends BaseController {

	readonly _userSvc: UserAdminService;
	readonly _emulatorAdminSvc: EmulatorAdminService;
	readonly _harvesterSvc: HarvesterService;

	constructor() {
		super();
		this._userSvc = new UserAdminService();
		this._emulatorAdminSvc = new EmulatorAdminService();
		this._harvesterSvc = new HarvesterService();
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
			let users = await this._userSvc.getUsers(query);
			res.send(users);
		} catch(e) {
			return this.sendError(e.message, res);
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
			return this.sendError(e.message, res);
		}
	}

	/**
	 * Adds or updates user record
	 * @param req - Express request
	 * @param res - Express response
	 */
	async saveUser(req: Request, res: Response) {
		try {
			let user = req.body;
			let success = await this._userSvc.saveUser(user.id, user);
			res.send(success);
		} catch(e) {
			return this.sendError(e.message, res);
		}
	}

	/**
	 * Deletes User
	 * @param req - Express request
	 * @param res - Express response
	 */
	async deleteUser(req: Request, res: Response) {
		try {
			let id = req.query.id as number;
			let roles = await this._userSvc.deleteUser(id);
			res.send(roles);
		} catch(e) {
			return this.sendError(e.message, res);
		}
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
			return this.sendError(e.message, res);
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
			return this.sendError(e.message, res);
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
			return this.sendError(e.message, res);
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
			return this.sendError(e.message, res);
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
			return this.sendError('Could not add new oai-pmh harvester', res);
		} catch(e) {
			return this.sendError(e.message, res);
		}
	}

	/**
	 * Syncs an existing oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async syncHarvester(req: Request, res: Response) {
		try {
			let { name, full } = req.query;
			let result = await this._harvesterSvc.syncHarvester(name, !!full);
			res.send(result);
		} catch(e) {
			return this.sendError(e.message, res);
		}
	}

	/**
	 * Deletes an existing oai-pmh harvester
	 * @param req - Express request
	 * @param res - Express response
	 */
	async deleteHarvester(req: Request, res: Response) {
		try {
			let { name } = req.query;
			let success = await this._harvesterSvc.deleteHarvester(name);
			if(success) return res.send(true);
			return this.sendError(`Could not delete oai-pmh harvester: ${name}`, res);
		} catch(e) {
			return this.sendError(e.message, res);
		}
	}
}
