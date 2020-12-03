import HttpResponseCode from '@/classes/HttpResponseCode';
import ReplicateEnvironmentRequest from '@/models/resource/ReplicateEnvironmentRequest';
import ContentService from '@/services/resource/ContentService';
import EnvironmentService from '@/services/resource/EnvironmentService';
import ResourceAdminService from '@/services/resource/ResourceAdminService';
import SoftwareService from '@/services/resource/SoftwareService';
import EaasiBookmarkService from '@/services/rest-api/EaasiBookmarkService';
import { IAuthorizedDeleteRequest, IAuthorizedRequest } from '@/types/auth/Auth';
import { IImageDeletePayload, IObjectClassificationRequest } from '@/types/emil/Emil';
import { ISoftwareObject } from '@/types/emil/EmilSoftwareData';
import { ITempEnvironmentRecord } from '@/types/emulation-porject/EmulationProject';
import { IClientEnvironmentRequest, IContentRequest, IEmulatorComponentRequest, IOverrideContentRequest, IReplicateEnvironmentRequest, IResourceSearchQuery } from '@/types/resource/Resource';
import { build_404_response, build_500_response } from '@/utils/error-helpers';
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
	private readonly _bookmarkService: EaasiBookmarkService;

	constructor(
		resourceService: ResourceAdminService = new ResourceAdminService(),
		environmentService: EnvironmentService = new EnvironmentService(),
		softwareService: SoftwareService = new SoftwareService(),
		contentService: ContentService = new ContentService(),
		bookmarkService: EaasiBookmarkService = new EaasiBookmarkService()
	) {
		super();
		this._svc = resourceService;
		this._environmentService = environmentService;
		this._softwareService = softwareService;
		this._contentService = contentService;
		this._bookmarkService = bookmarkService;
	}

	/**
	 * Gets an Environment by id  on the request query
	 */
	async getEnvironment(req: Request, res: Response) {
		try {
			let id = req.query.id as string;
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
			let id = req.query.id as string;
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
			let id = req.query.id as string;
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
			const archiveName = req.query.archiveId as string;
			const contentId = req.query.objectId as string;
			const contentRequest: IContentRequest = { archiveName, contentId };
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
			const archiveName = req.query.archiveId as string;
			const contentId = req.query.objectId as string;
			const contentRequest: IContentRequest = { archiveName, contentId };
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
			const archiveName = req.query.archiveName as string;
			const contentId = req.query.contentId as string;
			const contentRequest: IContentRequest = { archiveName, contentId };
			let deleteResult = await this._contentService.deleteContent(contentRequest);
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
			let result = await this._environmentService.forkRevision(revisionRequest);
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
			let result = await this._svc.searchResources(query, req.user.id);
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
			let revisionEnvRequest = req.body as IClientEnvironmentRequest;
			let result = await this._environmentService.saveEnvironmentRevision(revisionEnvRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/*============================================================
	 == Temporary Environments
	/============================================================*/

	/**
	 * Adds an Environment to a temporary archive
	 */
	async addToTempArchive(req: IAuthorizedRequest, res: Response) {
		try {
			let userId = req.user.id;
			let payload: IEmulatorComponentRequest = req.body;
			let tempEnvRecord = await this._environmentService.addToTempArchive(userId, payload.environment);
			return res.send(tempEnvRecord);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async createAndAddToTempArchive(req: IAuthorizedRequest, res: Response) {
		try {
			let userId = Number(req.user.id);
			let emuComponentRequest: IEmulatorComponentRequest = req.body;
			let derivative = await this._environmentService.createDerivative(emuComponentRequest);
			this._logger.log.info(`Temporary Environment with id ${derivative.envId} has been created for user ${userId}`);
			let savedEnvironment = await this._environmentService.addToTempArchive(userId, derivative.envId);
			return res.send(savedEnvironment);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Deletes an Environment from a temporary archive
	 */
	async deleteFromTempArchive(req: IAuthorizedDeleteRequest, res: Response) {
		try {
			let id = req.params.id;
			let userId = req.user.id;
			let tempEnvResponse = await this._environmentService.getAllTemp();
			if (tempEnvResponse.result != null && tempEnvResponse.result.length) {
				let tempEnvRecords = tempEnvResponse.result.map(r => r.get({ plain: true }) as ITempEnvironmentRecord);
				let curTempRecord = tempEnvRecords.find(temp => temp.envId === id);
				if (!curTempRecord) return res.send(false);
				await this._environmentService.deleteEnvironment(id);
				this._logger.log.info(`Temporary Environment with id ${id} has been deleted for user ${userId}`);
				let success = await this._environmentService.deleteFromTempArchive(id);
				return res.send(success);
			}
			return res.send(false);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
	 * Gets All Environments from a temporary archive
	 */
	async getAllTemp(req: Request, res: Response) {
		try {
			let response = await this._environmentService.getAllTemp();
			if (response.hasError) {
				return res
					.status(HttpResponseCode.SERVER_ERROR)
					.send(build_500_response(response.error));
			}

			if (response.result == null) {
				return res
					.status(HttpResponseCode.NOT_FOUND)
					.send(build_404_response(req.originalUrl));
			}
			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

}
