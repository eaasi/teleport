import { Request, Response } from 'express';
import {areAllValidIntegerParams} from '@/utils/validators';
import {build_400_response, build_404_response, build_500_response} from '@/utils/error-helpers';
import ICrudController from '@/controllers/interfaces/ICrudController';
import CrudQuery from '@/services/base/CrudQuery';
import HttpResponseCode from '@/utils/HttpResponseCode';
import {Result} from 'express-validator';
import CrudService from 'src/services/base/CrudService';
import BaseController from './BaseController';


/**
 * Base class for Controllers that handle CRUD logic
 */
export default class BaseCrudController extends BaseController implements ICrudController {

	private _crudService: CrudService;

	constructor(crudService: CrudService) {
		super();
		this._crudService = crudService;
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
			return await res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(JSON.stringify(req.query)));
		}

		let response = await this._crudService.getAll(req.query);

		if (response.hasError) {
			return await res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return await res.send(response.result);
	}

	/**
	 * Gets a resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req: Request, res: Response) {
		const id = req.params.id;

		if (req.params.id == null) {
			return await res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.params));
		}

		let response = await this._crudService.getByPk(id);

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

	/**
	 * Creates a new resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async create(req: Request, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return await res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(req.body));
		}

		let response = await this._crudService.create(newObject);

		if (response.hasError) {
			return await res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		return await res.status(HttpResponseCode.CREATED).send(response.result);
	}

	/**
	 * Updates a resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req: Request, res: Response) {
		const id = req.params.id;
		const updateData = req.body;
		let updateResponse = await this._crudService.update(id, updateData);

		if (updateResponse.hasError) {
			return BaseCrudController._handleUpdateError(req, res, updateResponse);
		}

		return await res.status(HttpResponseCode.OK).send(updateResponse);
	}

	/**
	 * Deletes a resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req: Request, res: Response) {
		const id = req.params.id;
		let deleteResponse = await this._crudService.destroy(id);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return await res.status(HttpResponseCode.OK).send(deleteResponse);
	}

	/**
	 * Formats an express-validator error message when a malformed request is made
	 * @param req request
	 * @param res response
	 * @param errors express-validator Result errors
	 */
	async sendMalformedRequestResponse(req: Request, res: Response, errors: Result<any>) {
		let allErrors = errors.array();
		let errorMessage = '';

		for (let i = 0; i < allErrors.length; i++) {

			let thisError = allErrors[i],
				value = thisError.value,
				message = thisError.msg,
				param = thisError.param,
				location = thisError.location;

			errorMessage +=
				`${message}: The value '${value}' for parameter '${param}' cannot be parsed. Location: ${location} `;
		}

		this._logger.log.error(errorMessage);
		await res.send(build_400_response(errorMessage));
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
			return await res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return await res
			.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(updateResponse.error));
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
			return await res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return await res
			.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(deleteResponse.error));
	}
}
