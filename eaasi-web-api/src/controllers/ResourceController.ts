import BaseController from './base/BaseController';
import { Request, Response } from 'express';
import { IResourceSearchQuery } from '@/types/resource/Resource';
import ResourceAdminService from '@/services/resource/ResourceAdminService';
import EmilEnvironmentService from '@/services/eaas/emil/EmilEnvironmentService';
import EmilContainerService from '@/services/eaas/emil/EmilContainerService';
import { IObjectClassificationRequest } from '@/types/emil/Emil';
import { ISoftwareObject } from '@/types/emil/EmilSoftwareData';

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
	 * Saves a Software Object
	 */
	async saveSoftwareObject(req: Request, res: Response) {
		try {
			let softwareObject = req.body as ISoftwareObject;
			let result = await this._svc.saveSoftwareObject(softwareObject);
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
	 * Gets a Software Metadata by `id` on the request query
	 */
	async getSoftwareMetadata(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._svc.getSoftwareMetadata(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Updates Environment description
	 */
	async updateEnvironmentDetails(req: Request, res: Response) {
		try {
			const { environment } = req.body;
			if (!environment) return this.sendError('no environment', res);
			const emilEnvironmentService = new EmilEnvironmentService()
			const result = await emilEnvironmentService.updateDescription(environment);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Replicates a list of images to the requested archive
	 */
	async replicateImage(req: Request, res: Response) {
		try {
			let replicateRequest = req.body;
			let result = await this._svc.replicateImage(replicateRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Creates a fork request for the requested revision
	 */
	async forkRevision(req: Request, res: Response) {
		try {
			let revisionRequest = req.body;
			let result = await this._svc.forkRevision(revisionRequest);
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
			let result = await this._svc.deleteEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Gets available environment templates object
	 */
	async getEnvironmentTemplates(req: Request, res: Response) {
		try {
			let result = await this._svc.getEnvironmentTemplates();
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Gets available patches object
	 */
	async getPatches(req: Request, res: Response) {
		try {
			let result = await this._svc.getPatches();
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Detects environments that uses requested software object
	 */
	async classify(req: Request, res: Response) {
		try {
			let classifyRequest = req.body as IObjectClassificationRequest;
			var emilContainerSvc = new EmilContainerService();
			let result = await emilContainerSvc.classify(classifyRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getOperatingSystemMetadata(req: Request, res: Response) {
		try {
			let result = await this._svc.getOperatingSystemMetadata();
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getNameIndexes(req: Request, res: Response) {
		try {
			let result = await this._svc.getNameIndexes();
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getObjectArchive(req: Request, res: Response) {
		try {
			let result = await this._svc.getObjectArchive();
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
