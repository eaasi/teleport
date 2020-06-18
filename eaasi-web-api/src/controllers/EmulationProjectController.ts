import EmulationProjectService from '@/services/rest-api/EmulationProjectService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { Response } from 'express';
import { EmulationProject } from '@/data_access/models/app';
import UserOwnedCrudController from './base/UserOwnedCrudController';

class EmulationProjectController extends UserOwnedCrudController<EmulationProject> {

	constructor(service: EmulationProjectService = new EmulationProjectService()) {
		super(service);
	}

	/**
	 * Gets an Emulation Project by userId
	 */
	async getForUser(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = req.user.id;
			let result = await this.service.getOneWhere({
				userId
			})
			if(!result) {
				return this.sendNotFound(res);
			}
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}
}

module.exports = EmulationProjectController;