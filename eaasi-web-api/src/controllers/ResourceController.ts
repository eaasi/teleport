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

	async getEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getSoftwarePackageDescription(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getSoftwarePackageDescription(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getSoftwareObject(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getSoftwareObject(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
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
