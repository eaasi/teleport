import BaseService from '../base/BaseService';
import EmilBaseService from '../eaas/emil/EmilBaseService';

/**
 * Handles the image import process
 */
export default class ImageService extends BaseService {

	private readonly _emilEnvService : EmilBaseService;

	constructor(
		imageService: EmilBaseService = new EmilBaseService('EmilEnvironmentData'),
	) {
		super();
		this._emilEnvService = imageService;
	}

	/**
	 * Posts Image Import Data to trigger import task from a URL
	 */
	async importImageFromUrl(importData: any) {
		return await this._emilEnvService.post('importImage', importData);
	}
}
