import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';
import UserOwnedCrudController from './base/UserOwnedCrudController';
import { EmulationProjectResource } from '@/data_access/models/app';
import { IAuthorizedRequest } from '@/types/auth/Auth';
import { Response } from 'express';

export default class EmulationProjectResourceController extends UserOwnedCrudController<EmulationProjectResource> {

	constructor(service: EmulationProjectResourceService = new EmulationProjectResourceService()) {
		super(service);
	}

	/**
	 * Gets project resources by project ID
	 */
	async getForProject(req: IGetEmulationProjectResourcesRequest, res: Response) {
		try {
			let result = await this.service.getAllWhere({
				emulationProjectId: Number(req.params.projectId)
			})
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

}

export interface IGetEmulationProjectResourcesRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
	};
}