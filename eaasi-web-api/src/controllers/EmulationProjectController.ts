import HttpResponseCode from '@/classes/HttpResponseCode';
import { EmulationProject } from '@/data_access/models/app';
import TempEnvironmentService from '@/services/resource/TempEnvironmentService';
import EmulationProjectService from '@/services/rest-api/EmulationProjectService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { ITempEnvironmentRecord } from '@/types/emulation-porject/EmulationProject';
import { build_404_response, build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';
import UserOwnedCrudController from './base/UserOwnedCrudController';

export default class EmulationProjectController extends UserOwnedCrudController<EmulationProject> {
	
	private readonly _tempEnvironmentService: TempEnvironmentService;

	constructor(
		service: EmulationProjectService = new EmulationProjectService(),
		tempEnvService: TempEnvironmentService = new TempEnvironmentService()
	) {
		super(service);
		this._tempEnvironmentService = tempEnvService;
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

	async addToTempArchive(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = Number(req.user.id);
			let envId = req.params.envId;
			let tempEnvRecord: ITempEnvironmentRecord = {
				userId,
				envId
			};
			let response = await this._tempEnvironmentService.create(tempEnvRecord);
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

	async deleteFromTempArchive(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = Number(req.user.id);
			let envId = req.params.envId;
			let tempEnvRecord = await this._tempEnvironmentService.getOneWhere({
				userId,
				envId,
			});
			if (tempEnvRecord.hasError) {
				return res
					.status(HttpResponseCode.SERVER_ERROR)
					.send(build_500_response(tempEnvRecord.error));
			}

			if (tempEnvRecord.result == null) {
				return res
					.status(HttpResponseCode.NOT_FOUND)
					.send(build_404_response(req.originalUrl));
			}
			let plain = tempEnvRecord.result.get({ plain: true }) as ITempEnvironmentRecord;
			let response = await this._tempEnvironmentService.destroy(plain.id);
			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

}