import BaseCrudController from '@/controllers/base/BaseCrudController';
import EaasiBookmarkService from '@/services/rest-api/EaasiBookmarkService';
import { Request, Response } from 'express-serve-static-core';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { build_400_response, build_500_response, build_404_response } from '@/utils/error-helpers';
import BaseController from '../base/BaseController';

export default class EaasiBookmarkController extends BaseController {

	readonly bookmarkService: EaasiBookmarkService;

	constructor(bookmarkService = new EaasiBookmarkService()) {
		super();
		this.bookmarkService = bookmarkService;
	}

	/**
	 * Gets all bookmarks by user id
	 * @param req request
	 * @param res response
	 */
	async getByUserID(req: Request, res: Response) {
		const userID = req.query.userID;
		if (userID == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.query));
		}

		let response = await this.bookmarkService.getByUserID(userID);

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

		return res.status(HttpResponseCode.OK).send(response.result);
	}

	/**
	 * Creates a new bookmark and persists to database
	 * @param req request
	 * @param res response
	 */
	async create(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this.bookmarkService.create(newObject);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Deletes a bookmark by id
	 * @param req request
	 * @param res response
	 */
	async delete(req: Request, res: Response) {
		const id = req.query.id;
		let deleteResponse = await this.bookmarkService.destroy(id);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return res.status(HttpResponseCode.OK).send(deleteResponse);
	}

	async deleteAll(req: Request, res: Response) {
		const userID = req.query.userID;
		if (userID == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.query));
		}

		let deleteResponse = await this.bookmarkService.destroyAll(userID);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return res.status(HttpResponseCode.OK).send(deleteResponse);
	}
}
