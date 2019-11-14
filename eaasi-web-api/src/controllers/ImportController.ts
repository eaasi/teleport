import ImportService from '@/services/import/importService';
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
	async importImageFromUrl(req: Request, res: Response) {
		try {
			if (!req.body) this.sendClientError('Request to import resource from URL requires request body', res);
			let result = await this._svc.importResourceFromUrl(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
