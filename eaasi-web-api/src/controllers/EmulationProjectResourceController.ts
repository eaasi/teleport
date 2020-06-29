import EmulationProjectResourceService from '@/services/rest-api/EmulationProjectResourceService';
import { IAuthorizedRequest, IAuthorizedPostRequest, IAuthorizedPatchRequest, IAuthorizedDeleteRequest } from '@/types/auth/Auth';
import { Response } from 'express';
import BaseController from './base/BaseController';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_500_response } from '@/utils/error-helpers';
import BaseCrudController from './base/BaseCrudController';
import { EmulationProjectResource } from '@/data_access/models/app';

export default class EmulationProjectResourceController extends BaseController {

	private _svc: EmulationProjectResourceService;

	constructor(
		service: EmulationProjectResourceService = new EmulationProjectResourceService()
	) {
		super();
		this._svc = service;
	}

	/**
	 * Gets project resources by project ID
	 */
	async getForProject(req: IGetEmulationProjectResourcesRequest, res: Response) {
		try {
			let result = await this._svc.getEaasiResources(Number(req.params.projectId));
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
		let response = await this._svc.create(req.body);
		const err: Error = response.error instanceof Error ? response.error : new Error(response.error);
		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(err));
		}
		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Updates a resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req: IAuthorizedPatchRequest<EmulationProjectResource>, res: Response) {
		const id = Number(req.params.id);
		const updateData = req.body;
		let updateResponse = await this._svc.update(id, updateData);

		if (updateResponse.hasError) {
			return BaseCrudController._handleUpdateError(req, res, updateResponse);
		}

		return res.status(HttpResponseCode.OK).send(updateResponse);
	}

	/**
	 * Deletes a resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req: IAuthorizedDeleteRequest, res: Response) {
		const id = Number(req.params.id);
		let deleteResponse = await this._svc.destroy(id);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return res.status(HttpResponseCode.OK).send(deleteResponse);
	}

}

export interface IGetEmulationProjectResourcesRequest extends IAuthorizedRequest {
	params: {
		projectId: string;
	};
}