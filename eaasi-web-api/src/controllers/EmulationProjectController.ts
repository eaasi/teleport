import HttpResponseCode from '@/classes/HttpResponseCode';
import { EmulationProject } from '@/data_access/models/app';
import { IBaseCronRoutine } from '@/routines/BaseCronRoutine';
import EmulationProjectRoutine from '@/routines/EmulationProjectScheduler';
import EmulationProjectService from '@/services/rest-api/EmulationProjectService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { build_404_response, build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';
import UserOwnedCrudController from './base/UserOwnedCrudController';

export default class EmulationProjectController extends UserOwnedCrudController<EmulationProject> {
	
	private readonly routine: IBaseCronRoutine;

	constructor(
		service: EmulationProjectService = new EmulationProjectService(),
	) {
		super(service);
		this.routine = new EmulationProjectRoutine();
		this.routine.start();
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