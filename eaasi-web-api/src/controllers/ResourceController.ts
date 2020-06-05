import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import ContentService from '@/services/resource/ContentService';
import EnvironmentService from '@/services/resource/EnvironmentService';
import ResourceAdminService from '@/services/resource/ResourceAdminService';
import SoftwareService from '@/services/resource/SoftwareService';
import { IImageDeletePayload, IObjectClassificationRequest } from '@/types/emil/Emil';
import { ISoftwareObject } from '@/types/emil/EmilSoftwareData';
import { IContentRequest, IOverrideContentRequest, IReplicateEnvironmentRequest, IResourceSearchQuery } from '@/types/resource/Resource';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

/**
 * Handles requests related to Resource entities
 */
export default class ResourceController extends BaseController {

	private readonly _svc: ResourceAdminService;
	private readonly _environmentService: EnvironmentService;
	private readonly _softwareService: SoftwareService;
	private readonly _contentService: ContentService;

	constructor(
		resourceService: ResourceAdminService = new ResourceAdminService(),
		environmentService: EnvironmentService = new EnvironmentService(),
		softwareService: SoftwareService = new SoftwareService(),
		contentService: ContentService = new ContentService(),
	) {
		super();
		this._svc = resourceService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;
	}

	/**
	 * Gets an Environment by id  on the request query
	 */
	async getEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._environmentService.getEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Saves a Software Object
	 */
	async saveSoftwareObject(req: Request, res: Response) {
		try {
			let softwareObject = req.body as ISoftwareObject;
			let result = await this._softwareService.saveSoftwareObject(softwareObject);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets information about a Software Package by `id` on the request query
	 */
	async getSoftwarePackageDescription(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._softwareService.getSoftwareDescription(id);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets a Software Object by `id` on the request query
	 */
	async getSoftwareObject(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._softwareService.getSoftwarePackage(id);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets a list of Software Objects by `ids` array on the request query
	 */
	async getSoftwareObjects(req: Request, res: Response) {
		try {
			let ids = req.query.ids.split(',') as string[];
			let result = await this._svc.getSoftwareObjects(ids)
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets a Software Metadata by `id` on the request query
	 */
	async getSoftwareMetadata(req: Request, res: Response) {
		try {
			let { archiveId, objectId } = req.query;
			const contentRequest: IContentRequest = {
				archiveName: archiveId,
				contentId: objectId
			}
			let result = await this._contentService.getObjectMetadata(contentRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets Content by content request
	 */
	async getContent(req: Request, res: Response) {
		try {
			const contentRequest = req.query as IContentRequest;
			let result = await this._contentService.getObjectMetadata(contentRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Saves Content Object metadata
	 */
	async saveContent(req: Request, res: Response) {
		try {
			const contentOverride = req.body as IOverrideContentRequest;
			const result = await this._svc.saveContent(contentOverride);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Deletes Content Object
	 */
	async deleteContent(req: Request, res: Response) {
		try {
			const contentRequest = req.query as IContentRequest;
			await this._contentService.deleteContent(contentRequest);
			res.send(true);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Updates Environment description
	 */
	async updateEnvironmentDetails(req: Request, res: Response) {
		try {
			const { environment } = req.body;
			if (!environment) return this.sendError(new Error('no environment'), res);
			const result = await this._environmentService.updateEnvironmentDescription(environment);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Replicates a list of images to the requested archive
	 */
	async replicateEnvironment(req: Request, res: Response) {
		try {
			let replicateRequest = req.body as IReplicateEnvironmentRequest;
			const replicateEnvironmentRequest = new ReplicateEnvironmentRequest(replicateRequest)
			let result = await this._environmentService.replicateEnvironment(replicateEnvironmentRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async deleteImage(req: Request, res: Response) {
		try {
			const payload = req.body as IImageDeletePayload;
			await this._environmentService.deleteImage(payload);
			res.send(true);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Creates a fork request for the requested revision
	 */
	async forkRevision(req: Request, res: Response) {
		try {
			let revisionRequest = req.body;
			let result = await this._environmentService.forkRevision(revisionRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
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
			this.sendError(e, res);
		}
	}

	/**
	 * Deletes a resource
	 */
	async deleteEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id;
			let result = await this._environmentService.deleteEnvironment(id);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets available environment templates object
	 */
	async getTemplates(req: Request, res: Response) {
		try {
			let result = await this._environmentService.getTemplates();
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets available patches object
	 */
	async getPatches(req: Request, res: Response) {
		try {
			let result = await this._environmentService.getPatches();
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Detects environments that uses requested software object
	 */
	async classify(req: Request, res: Response) {
		try {
			let classifyRequest = req.body as IObjectClassificationRequest;
			let result = await this._svc.classify(classifyRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getOperatingSystemMetadata(req: Request, res: Response) {
		try {
			let result = await this._environmentService.getOperatingSystemMetadata();
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getNameIndexes(req: Request, res: Response) {
		try {
			let result = await this._environmentService.getNameIndexes();
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getObjectArchives(req: Request, res: Response) {
		try {
			let result = await this._contentService.getObjectArchives();
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveNewEnvironment(req: Request, res: Response) {
		try {
			let newEnvRequest = req.body;
			let result = await this._environmentService.saveNewEnvironment(newEnvRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveNewObjectEnvironment(req: Request, res: Response) {
		try {
			let newEnvRequest = req.body;
			let result = await this._environmentService.saveNewObjectEnvironment(newEnvRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveEnvironmentRevision(req: Request, res: Response) {
		try {
			let revisionEnvRequest = req.body;
			let result = await this._environmentService.saveEnvironmentRevision(revisionEnvRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}
}