import HttpResponseCode from '@/classes/HttpResponseCode';
import { TempEnvironment } from '@/data_access/models/app/TempEnvironment';
import TempEnvironmentService from '@/services/resource/TempEnvironmentService';
import { IAuthorizedGetRequest } from '@/types/auth/Auth';
import { ITempEnvironmentRecord } from '@/types/emulation-porject/EmulationProject';
import { build_404_response, build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';
import BaseCrudController from './base/BaseCrudController';

export default class TempEnvironmentController extends BaseCrudController<TempEnvironment> {

	constructor(service: TempEnvironmentService = new TempEnvironmentService()) {
		super(service);
	}

	async addToTempArchive(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = Number(req.user.id);
			let envId = req.params.id;
			let tempEnvRecord: ITempEnvironmentRecord = {
				userId,
				envId
			};
			let response = await this.service.create(tempEnvRecord);
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
			let envId = req.params.id;
			let tempEnvRecord = await this.service.getOneWhere({
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
			let response = await this.service.destroy(plain.id);
			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}
}