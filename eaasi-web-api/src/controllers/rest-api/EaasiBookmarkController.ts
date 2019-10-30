import BaseCrudController from '@/controllers/base/BaseCrudController';
import EaasiBookmarkService from '@/services/rest-api/EaasiBookmarkService';
import { Request, Response } from 'express-serve-static-core';
import HttpResponseCode from '@/utils/HttpResponseCode';
import { build_400_response, build_500_response, build_404_response } from '@/utils/error-helpers';

class EaasiBookmarkController extends BaseCrudController {

	readonly bookmarkService: EaasiBookmarkService;
	
	constructor() {
		super(new EaasiBookmarkService());

		this.bookmarkService = new EaasiBookmarkService();
	}

		/**
	 * Gets a resource by ID
	 * @param req request
	 * @param res response
	 */
	async getByUserID(req: Request, res: Response) {
		const { userID } = req.params;
		console.log(req.params);
		if (userID == null) {
			return await res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.params));
		}

		let response = await this.bookmarkService.getByUserID(userID);
		console.log(response);

		if (response.hasError) {
			return await res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		if (response.result == null) {
			return await res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return await res.status(HttpResponseCode.OK).send(response.result);
	}

}

module.exports = EaasiBookmarkController;
