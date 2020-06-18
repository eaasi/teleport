import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';
import { EmulationProjectResource } from '@/data_access/models/app';
import { IAuthorizedRequest } from '@/types/auth/Auth';
import { Response } from 'express';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_500_response } from '@/utils/error-helpers';
import BaseCrudController from './base/BaseCrudController';

export default class EmulationProjectResourceController extends BaseCrudController<EmulationProjectResource> {

	constructor(service: EmulationProjectResourceService = new EmulationProjectResourceService()) {
		super(service);
	}

	/**
	 * Gets project resources by project ID
	 */
	async getForProject(req: IGetEmulationProjectResourcesRequest, res: Response) {
		try {
			let response = await this.service.getAllWhere({
				emulationProjectId: Number(req.params.projectId)
			})
			if (response.hasError) {
				return res
					.status(HttpResponseCode.SERVER_ERROR)
					.send(build_500_response(response.error));
			}
			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

}

export interface IGetEmulationProjectResourcesRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
	};
}