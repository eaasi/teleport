import CrudQuery from '@/services/base/CrudQuery';
import UserService from '@/services/admin/UserService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

export default class AdminController extends BaseController {

	readonly _userSvc: UserService;

	constructor() {
		super();
		this._userSvc = new UserService();
	}

	async getUsers(req: Request, res: Response) {
		let query = req.body as CrudQuery;
		try {
		    // TODO Verify this is equivalent to awaiting into a var then return
			return await this._userSvc.getUsers(query);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getRoles() {
		this._userSvc.getRoles().then((res) => {
			res.send(res.result);
		});
	}

}
