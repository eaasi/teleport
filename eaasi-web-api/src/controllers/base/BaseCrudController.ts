import HttpResponseCode from '@/classes/HttpResponseCode';
import ICrudController from '@/controllers/interfaces/ICrudController';
import { build_400_response, build_404_response, build_500_response } from '@/utils/error-helpers';
import { areAllValidIntegerParams } from '@/utils/validators';
import { Request, Response } from 'express';
import { Model } from 'sequelize-typescript';
import CrudService from 'src/services/base/CrudService';
import BaseController from './BaseController';


/**
 * Base class for Controllers that handle CRUD logic
 */
export default class BaseCrudController<T extends Model> extends BaseController implements ICrudController {

	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected service: CrudService<T>;

	//eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(crudService: CrudService<T>) {
		super();
		this.service = crudService;
	}

	/**
	 * Returns all object instances in paginated form.
	 * @param req request
	 * @param res response
	 */
	async getAll(req: Request, res: Response) {
		let query = this._getQueryFromParams(req);

		// todo: investigate more robust query string validation, add sortCol validation
		if (!areAllValidIntegerParams([query.limit, query.page])) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(JSON.stringify(req.query)));
		}

		let response = await this.service.getAll(query);
		const err: Error = response.error instanceof Error ? response.error : new Error(response.error);
		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(err));
		}

		return res.send(response.result);
	}

	/**
	 * Gets a resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req: Request, res: Response) {
		// @ts-ignore
		const id = Number(req.params.id);

		// @ts-ignore
		if (req.params.id == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				// @ts-ignore
				.send(build_400_response(req.params));
		}

		let response = await this.service.getByPk(id);
		const err: Error = response.error instanceof Error ? response.error : new Error(response.error);
		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(err));
		}

		if (response.result == null) {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return res.status(HttpResponseCode.OK).send(response.result);
	}

	/**
	 * Creates a new resource and persists to database
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

		let response = await this.service.create(newObject);
		const err: Error = response.error instanceof Error ? response.error : new Error(response.error);
		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(err));
		}

		return res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Updates a resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req: Request, res: Response) {
		const id = Number(req.params.id);
		const updateData = req.body;
		let updateResponse = await this.service.update(id, updateData);

		if (updateResponse.hasError) {
			return BaseCrudController._handleUpdateError(req, res, updateResponse);
		}

		return res.status(HttpResponseCode.OK).send(updateResponse);
	}

	/**
	 * Deletes a resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req: Request, res: Response) {
		const id = Number(req.params.id);
		let deleteResponse = await this.service.destroy(id);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return res.status(HttpResponseCode.OK).send(deleteResponse);
	}

	/**
	 * Handles sending an error response for an update action
	 * @param req Express req
	 * @param res Express res
	 * @param updateResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	static async _handleUpdateError(req: Request, res: Response, updateResponse: any) {
		if (updateResponse.error === 'notFound') {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}
		const err: Error = updateResponse.error instanceof Error ? updateResponse.error : new Error(updateResponse.error);
		return res
			.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(err));
	}

	/**
	 * Handles sending an error response for a delete action
	 * @param req Express req
	 * @param res Express res
	 * @param deleteResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	static async _handleDeleteError(req: Request, res: Response, deleteResponse: any) {
		if (deleteResponse.error === 'notFound') {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}
		const err: Error = deleteResponse.error instanceof Error ? deleteResponse.error : new Error(deleteResponse.error);
		return res
			.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(err));
	}
}
