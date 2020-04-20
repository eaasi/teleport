import ImageService from '@/services/image/ImageService';
import { Request, Response } from 'express';
import BaseController from './base/BaseController';

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
		try {
			if (!req.body) this.sendClientError(new Error('Request to import image from URL requires body'), res);
			let result = await this._svc.importImageFromUrl(req.body);
			res.send(result);
		} catch(e) {
			this.sendError(e, res);
		}
	}
}
