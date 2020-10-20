import ImportService from '@/services/import/importService';
import { ICreateEnvironmentPayload, IImageImportPayload, IUploadRequest } from '@/types/emil/Emil';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

/**
 * Handles requests concerning importing resources
 */
export default class ImportController extends BaseController {

	private readonly _emilImportService: ImportService;

	constructor(importService: ImportService= new ImportService()) {
		super();
		this._emilImportService  = importService;
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
			let emilResult = await this._emilImportService.importImage(req.body);

			// Invoke internal endpoint for associating a user with an import
			// let userImportResult =  await this._userImportService.getByUserID(userId);
			
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
			let result = await this._emilImportService.importResourceFromFile(req.body);
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
			let result = await this._emilImportService.snapshotImage(req.body);
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
			let result = await this._emilImportService.postComponents(req.body);
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
	async createEnvironment(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to create image from ISO file upload requires request body'), res);
			let result = await this._emilImportService.createEnvironment(req.body as ICreateEnvironmentPayload);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Makes a POST request to import image from url
	 * @param req
	 * @param res
	 */
	async importImage(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError(new Error('Request to import image from url requires request body'), res);
			let result = await this._emilImportService.importImage(req.body as IImageImportPayload);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}
	
}
