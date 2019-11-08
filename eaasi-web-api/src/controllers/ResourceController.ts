import BaseController from './base/BaseController';
import { Request, Response } from 'express';
import { IResourceSearchQuery } from '@/types/resource/Resource';
import ResourceAdminService from '@/services/resource/ResourceAdminService';

/**
 * Handles requests related to Resource entities
 */
export default class ResourceController extends BaseController {

	private readonly _svc: ResourceAdminService;

	constructor(resourceService: ResourceAdminService = new ResourceAdminService()) {
		super();
		this._svc = resourceService;
	}

	/**
	 * Gets an Environment by id  on the request query
	 */
	async getEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Saves an Environment to local Node using `environmentId` on the request body
	 */
	async saveEnvironment(req: Request, res: Response) {
		try {
			let environmentId = req.body.environmentId;
			if (!environmentId) this.sendClientError('Request to save environment requires non-null Environment ID', res)
			let result = await this._svc.saveEnvironment(environmentId);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Gets information about a Software Package by `id` on the request query
	 */
	async getSoftwarePackageDescription(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getSoftwarePackageDescription(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Gets a Software Object by `id` on the request query
	 */
	async getSoftwareObject(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getSoftwareObject(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Searches for resources using the request body as IResourceSearchQuery
	 */
	async search(req: Request, res: Response) {
		try {
			let query = req.body as IResourceSearchQuery;
			let result = await this._svc.searchResources(query);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Deletes a resource
	 */
	async deleteEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id;
			console.log('in resourceController, got ID: ', id);
			let result = await this._svc.deleteEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
