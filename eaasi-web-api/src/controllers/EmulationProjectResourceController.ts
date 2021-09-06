import HttpResponseCode from '@/classes/HttpResponseCode';
import { EmulationProjectResource } from '@/data_access/models/app';
import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';
import { IAuthorizedPostRequest, IAuthorizedRequest } from '@/types/auth/Auth';
import { ResourceType } from '@/types/resource/Resource';
import { build_400_response, build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';
import { Op } from 'sequelize';
import BaseController from './base/BaseController';

export default class EmulationProjectResourceController extends BaseController {

	private _emulationProjectResourceService: EmulationProjectResourceService;

	constructor(
		service: EmulationProjectResourceService = new EmulationProjectResourceService()
	) {
		super();
		this._emulationProjectResourceService = service;
	}

	/**
	 * Gets project resources by project ID
	 */
	async getForProject(req: IGetEmulationProjectResourcesRequest, res: Response) {
		try {
			const projectId = Number(req.params.projectId);
			const result = await this._emulationProjectResourceService.getEaasiResources(projectId, req.headers.authorization);
			res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async deleteForTypes(req: IAuthorizedPostRequest<ResourceType[]>, res: Response) {
		try {
			const emulationProjectId = Number(req.params.projectId);
			const resourceTypes = req.body as ResourceType[];
			const result = await this._emulationProjectResourceService.destroyAllWhere({ emulationProjectId, resourceType: { [Op.or]: resourceTypes } });
			res.send(result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Creates a new resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async create(req: IAuthorizedPostRequest<EmulationProjectResource>, res: Response) {
		const response = await this._emulationProjectResourceService.create(req.body);
		const err: Error = response.error instanceof Error ? response.error : new Error(response.error);
		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(err));
		}
		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Deletes a resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req: IDeleteEmulationProjectResourceRequest, res: Response) {
		const resourceId = req.params.resourceId;
		const emulationProjectId = Number(req.params.projectId);
		const result = await this._emulationProjectResourceService.destroyAllWhere({ resourceId, emulationProjectId });
		if (result.hasError) {
			this._logger.log.error(`Emulation project resource (${resourceId}, ${emulationProjectId}) can't be removed: ${result.error}`);
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_400_response(JSON.stringify(req.params)));
		}
		return res.status(HttpResponseCode.OK).send(result);
	}

}

export interface IGetEmulationProjectResourcesRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
	};
}

export interface IDeleteEmulationProjectResourceRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
		resourceId: string;
	};
}

export interface IClearProjectResourceRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
	};
}
