import ImportService from '@/services/import/importService';
import { IAuthorizedPostRequest } from '@/types/auth/Auth';
import {ICreateEnvironmentPayload, IImageImportPayload, IUploadRequest, TaskState} from '@/types/emil/Emil';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';
import EaasiTaskService from '@/services/rest-api/EaasiTaskService';
import {IEmilTask} from '@/types/task/Task';
import {getTenantIdFromToken} from '@/utils/token';

/**
 * Handles requests concerning importing resources
 */
export default class ImportController extends BaseController {

	private readonly _emilImportService: ImportService;
	private readonly taskService: EaasiTaskService;

	constructor(importService: ImportService= new ImportService(),
		taskService: EaasiTaskService = new EaasiTaskService()) {
		super();
		this._emilImportService  = importService;
		this.taskService = taskService;
	}

	/**
	 * Makes a request to import a resource from a URL
	 */
	async importFromUrl(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to import resource from URL requires request body'), res);
			// let userId = req.body.userId;
			// if (!userId) this.sendClientError('Import requires a userId on request body', res);

			// Invoke emil endpoint for importing a resource from URL
			let token = req.headers.authorization;
			let emilResult = await this._emilImportService.importImage(req.body, token);

			// Invoke internal endpoint for associating a user with an import
			// let userImportResult =  await this._userImportService.getByUserID(userId);

			if (emilResult) {
				await this.createTask(emilResult, req);
			}

			res.send(emilResult);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a request to import a resource from a File
	 */
	async importFiles(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to import resource from a file requires request body'), res);
			let token = req.headers.authorization;
			let result: IEmilTask = await this._emilImportService.importResourceFromFile(req.body, token);
			if (result) {
				await this.createTask(result, req);
			}
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a request to import a resource from a URL
	 */
	async saveImportEnvironment(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to snapshot environment import requires request body'), res);
			let result = await this._emilImportService.snapshotImage(req.body, req.headers.authorization);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a request to post payload to components endpoint
	 */
	async postComponents(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to snapshot environment import requires request body'), res);
			let result = await this._emilImportService.postComponents(req.body, req.headers.authorization);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a request to upload files
	 */
	async uploadFiles(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to upload files requires request body'), res);
			let result = await this._emilImportService.uploadFiles(req as IUploadRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a POST request to create an environment from an ISO image upload
	 * @param req
	 * @param res
	 */
	async createEnvironment(req: IAuthorizedPostRequest<ICreateEnvironmentPayload>, res: Response) {
		try {
			if (!req.body) {
				return this.sendClientError('Request to create image from ISO file upload requires request body', res)
			}
			let result = await this._emilImportService.createEnvironment(req.body, req.headers.authorization);
			res.send(result);
		} catch(err) {
			this.sendError(err, res);
		}
	}

	/**
	 * Makes a POST request to import image from url
	 * @param req
	 * @param res
	 */
	async importImage(req: Request, res: Response) {
		try {
			if (!req.body) {
				this.sendClientError(new Error('Request to import image from url requires request body'), res);
			}
			let token = req.headers.authorization;
			const { url, label, imageType } = req.body;
			const data: IImageImportPayload = { url, label, imageType };
			let result = await this._emilImportService.importImage(data, token);
			if (result) {
				await this.createTask(result, req);
			}
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	async createTask(task: IEmilTask, req: Request) {
		let taskToSave = {
			...task,
			userData: task.userData ? JSON.stringify(task.userData) : null,
			tenantId: getTenantIdFromToken(req.headers.authorization),
			description: req.body.description,
		};
		await this.taskService.create(taskToSave);
	}

}