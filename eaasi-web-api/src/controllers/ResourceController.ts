import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import ContentService from '@/services/resource/ContentService';
import EnvironmentService from '@/services/resource/EnvironmentService';
import ResourceAdminService from '@/services/resource/ResourceAdminService';
import SoftwareService from '@/services/resource/SoftwareService';
import EaasiBookmarkService from '@/services/rest-api/EaasiBookmarkService';
import { IAuthorizedGetRequest, IAuthorizedRequest } from '@/types/auth/Auth';
import { IImageDeletePayload, IObjectClassificationRequest } from '@/types/emil/Emil';
import { ISoftwareObject } from '@/types/emil/EmilSoftwareData';
import { IClientEnvironmentRequest, IContentRequest, IOverrideContentRequest, IReplicateEnvironmentRequest, IResourceSearchQuery } from '@/types/resource/Resource';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';
import KeycloakService from '@/services/keycloak/KeycloakService';

/**
 * Handles requests related to Resource entities
 */
export default class ResourceController extends BaseController {

	private readonly _svc: ResourceAdminService;
	private readonly _environmentService: EnvironmentService;
	private readonly _softwareService: SoftwareService;
	private readonly _contentService: ContentService;
	private readonly _bookmarkService: EaasiBookmarkService;
	private readonly _keycloakService: KeycloakService;

	constructor(
		resourceService: ResourceAdminService = new ResourceAdminService(),
		environmentService: EnvironmentService = new EnvironmentService(),
		softwareService: SoftwareService = new SoftwareService(),
		contentService: ContentService = new ContentService(),
		bookmarkService: EaasiBookmarkService = new EaasiBookmarkService(),
		keycloakService: KeycloakService = new KeycloakService()
	) {
		super();
		this._svc = resourceService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;
		this._bookmarkService = bookmarkService;
		this._keycloakService = keycloakService;
	}

	/**
	 * Gets an Environment by id  on the request query
	 */
	async getEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id as string;
			let result = await this._environmentService.getEnvironment(id, req.headers.authorization);
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
			let token = req.headers.authorization;
			let result = await this._softwareService.saveSoftwareObject(softwareObject, token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async deleteSoftwareObject(req: Request, res: Response) {
		try {
			let id = req.query.id as string;
			let token = req.headers.authorization;
			let result = await this._softwareService.deleteSoftwareObject(id, token);
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
			let id = req.query.id as string;
			let token = req.headers.authorization;
			let result = await this._softwareService.getSoftwareDescription(id, token);
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
			let id = req.query.id as string;
			let token = req.headers.authorization;
			let result = await this._softwareService.getSoftwarePackage(id, token);
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
			let queryIds = req.query.ids as string;
			let ids = queryIds.split(',') as string[];
			let result = await this._softwareService.getSoftwareObjects(ids)
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
			const token = req.headers.authorization;
			const archiveName = req.query.archiveId as string;
			const contentId = req.query.objectId as string;
			const contentRequest: IContentRequest = { archiveName, contentId };
			let result = await this._contentService.getObjectMetadata(contentRequest, token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Gets Content by content request
	 */
	async getContent(req: IAuthorizedGetContentRequest, res: Response) {
		try {
			const token = req.headers.authorization;
			const { archiveName, contentId} = req.query;
			const contentRequest: IContentRequest = { archiveName, contentId };
			let result = await this._contentService.getObjectMetadata(contentRequest, token);
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
			const token = req.headers.authorization;
			const contentOverride = req.body as IOverrideContentRequest;
			const result = await this._svc.saveContent(contentOverride, token);
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
			const token = req.headers.authorization;
			const archiveName = req.query.archiveName as string;
			const contentId = req.query.contentId as string;
			const contentRequest: IContentRequest = { archiveName, contentId };
			let deleteResult = await this._contentService.deleteContent(contentRequest, token);
			res.send(deleteResult);
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
			const result = await this._environmentService.updateEnvironmentDescription(environment, req.headers.authorization);
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
			let token = req.headers.authorization;
			let replicateRequest = req.body as IReplicateEnvironmentRequest;
			const replicateEnvironmentRequest = new ReplicateEnvironmentRequest(replicateRequest)
			let result = await this._environmentService.replicateEnvironment(replicateEnvironmentRequest, token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async deleteImage(req: Request, res: Response) {
		try {
			const token = req.headers.authorization;
			const payload = req.body as IImageDeletePayload;
			await this._environmentService.deleteImage(payload, token);
			await this._bookmarkService.destroyAllByResource(payload.imageId);
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
			let token = req.headers.authorization;
			let result = await this._environmentService.forkRevision(revisionRequest, token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Searches for resources using the request body as IResourceSearchQuery
	 */
	async search(req: IAuthorizedRequest, res: Response) {
		try {
			let query = req.body as IResourceSearchQuery;
			let result = await this._svc.searchResources(query, String(req.query.userId), req.headers.authorization);
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
			let id = req.query.id as string;
			let result = await this._environmentService.deleteEnvironment(id, req.headers.authorization);
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
			let token = req.headers.authorization;
			let result = await this._environmentService.getTemplates(token);
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
			let token = req.headers.authorization;
			let result = await this._environmentService.getPatches(token);
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
			let token = req.headers.authorization;
			let classifyRequest = req.body as IObjectClassificationRequest;
			let result = await this._svc.classify(classifyRequest, token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getOperatingSystemMetadata(req: Request, res: Response) {
		try {
			let token = req.headers.authorization;
			let result = await this._environmentService.getOperatingSystemMetadata(token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getEmulators(req: Request, res: Response) {
		try {
			let token = req.headers.authorization;
			let result = await this._environmentService.getEmulators(token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getObjectArchives(req: Request, res: Response) {
		try {
			let token = req.headers.authorization;
			let result = await this._contentService.getObjectArchives(token);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveNewEnvironment(req: Request, res: Response) {
		try {
			let newEnvRequest = req.body;
			let result = await this._environmentService.saveNewEnvironment(newEnvRequest, req.headers.authorization);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveNewObjectEnvironment(req: Request, res: Response) {
		try {
			let newEnvRequest = req.body;
			let result = await this._environmentService.saveNewObjectEnvironment(newEnvRequest, req.headers.authorization);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async saveEnvironmentRevision(req: Request, res: Response) {
		try {
			let revisionEnvRequest = req.body as IClientEnvironmentRequest;
			let result = await this._environmentService.saveEnvironmentRevision(revisionEnvRequest, req.headers.authorization);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async getResourceOwner(req: Request, res: Response) {
		const ownerId = req.query.ownerId as string;
		let ownerLabel = await this._keycloakService.getOwnerLabel(ownerId, req.headers.authorization);
		return res.send({ label: ownerLabel });
	}
}


export interface IAuthorizedGetContentRequest extends IAuthorizedGetRequest {
	query: {
		archiveName: string;
		contentId: string;
	};
}