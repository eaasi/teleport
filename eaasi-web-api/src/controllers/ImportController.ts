import ImportService from '@/services/import/importService';
import {ICreateEnvironmentPayload, IUploadRequest} from '@/types/emil/Emil';
import BaseController from './base/BaseController';
import { Request, Response } from 'express';

/**
 * Handles requests concerning importing resources
 */
export default class ImportController extends BaseController {

	private readonly _svc: ImportService;

	constructor(importService: ImportService= new ImportService()) {
		super();
		this._svc = importService;
	}

	/**
	 * Makes a request to import a resource from a URL
	 */
	async importFromUrl(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to import resource from URL requires request body', res);
			let result = await this._svc.importResourceFromUrl(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Makes a request to import a resource from a File
	 */
	async importFiles(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to import resource from a file requires request body', res);
			let result = await this._svc.importResourceFromFile(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Makes a request to import a resource from a URL
	 */
	async saveImportEnvironment(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to snapshot environment import requires request body', res);
			let result = await this._svc.snapshotImage(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Makes a request to post payload to components endpoint
	 */
	async postComponents(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to snapshot environment import requires request body', res);
			let result = await this._svc.postComponents(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Makes a request to upload files
	 */
	async uploadFiles(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to upload files requires request body', res);
			let result = await this._svc.uploadFiles(req as IUploadRequest);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	/**
	 * Makes a POST request to create an environment from an ISO image upload
	 * @param req
	 * @param res
	 */
	async createEnvironment(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to create image from ISO file upload requires request body', res);
			let result = await this._svc.createEnvironment(req.body as ICreateEnvironmentPayload);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
