import EmulationProjectService from '@/services/rest-api/EmulationProjectService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { Response } from 'express';
import { EmulationProject } from '@/data_access/models/app';
import UserOwnedCrudController from './base/UserOwnedCrudController';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_500_response, build_404_response } from '@/utils/error-helpers';

export default class EmulationProjectController extends UserOwnedCrudController<EmulationProject> {

	constructor(service: EmulationProjectService = new EmulationProjectService()) {
		super(service);
	}

	/**
	 * Gets an Emulation Project by userId
	 */
	async getForUser(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = Number(req.user.id);
			let response = await this.service.getOneWhere({userId})
			if(!response.hasError && !response.result) {
				response = await this.service.create({userId})
			}
			if (response.hasError) {
				return res
					.status(HttpResponseCode.SERVER_ERROR)
					.send(build_500_response(response.error));
			}

			if (response.result == null) {
				return res
					.status(HttpResponseCode.NOT_FOUND)
					.send(build_404_response(req.originalUrl));
			}

			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}
}