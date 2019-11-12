import ImageService from '@/services/image/ImageService';
import BaseController from './base/BaseController';
import { Request, Response } from 'express';

/**
 * Handles requests related to Images
 */
export default class ImageController extends BaseController {

	private readonly _svc: ImageService;

	constructor(imageService: ImageService= new ImageService()) {
		super();
		this._svc = imageService;
	}

	/**
	 * Imports an Image from a URL string
	 */
	async importImageFromUrl(req: Request, res: Response) {
		console.log('::: ImageController req.body :::', req.body);
		try {
			if (!req.body) this.sendClientError('Request to import image from URL requires body', res);
			let result = await this._svc.importImageFromUrl(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
