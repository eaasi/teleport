import BaseController from './base/BaseController';
import { Request, Response } from 'express';
import { IResourceSearchQuery } from '@/types/resource/Resource';
import ResourceAdminService from '@/services/resource/ResourceAdminService';

export default class ResourceController extends BaseController {

	private readonly _svc: ResourceAdminService;

	constructor(resourceService: ResourceAdminService = new ResourceAdminService()) {
		super();
		this._svc = resourceService;
	}

	async search(req: Request, res: Response) {
		try {
			let query = req.body as IResourceSearchQuery;
			let result = await this._svc.searchResources(query);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

}