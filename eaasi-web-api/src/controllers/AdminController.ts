import EmulatorAdminService from '@/services/admin/EmulatorAdminService';
import UserAdminService from '@/services/admin/UserAdminService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';
import { IEmulatorImportRequest } from '@/types/emil/EmilContainerData';
import { EmulatorEntry } from '@/types/emil/EmilEnvironmentData';

export default class AdminController extends BaseController {

	readonly _userSvc: UserAdminService;
	readonly _emulatorAdminSvc: EmulatorAdminService;

	constructor() {
		super();
		this._userSvc = new UserAdminService();
		this._emulatorAdminSvc = new EmulatorAdminService();
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
	 * @param req - Express request
	 * @param res - Express response
	 */
	async getRoles(req: Request, res: Response) {
		try {
			let roles = await this._userSvc.getRoles();
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
	 * Sets the default emulator entry
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
}
