import UserAdminService from '@/services/admin/UserAdminService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

export default class AdminController extends BaseController {

	readonly _userSvc: UserAdminService;

	constructor() {
		super();
		this._userSvc = new UserAdminService();
	}

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

	async getRoles(req: Request, res: Response) {
		try {
			let roles = await this._userSvc.getRoles();
			res.send(roles);
		} catch(e) {
			return this.sendError(e.message, res);
		}
	}
}
