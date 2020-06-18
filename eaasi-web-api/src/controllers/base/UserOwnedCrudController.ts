import { build_400_response, build_404_response, build_500_response } from '@/utils/error-helpers';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { Response } from 'express';
import { Result } from 'express-validator';
import { EaasiUserOwnedModel } from '@/data_access/models/app/base-models/EaasiIUserOwnedModel';
import BaseCrudController from './BaseCrudController';
import { IAuthorizedRequest,
	IAuthorizedPostRequest,
	IAuthorizedPutRequest,
	IAuthorizedDeleteRequest,
	IAuthorizedGetRequest
} from '@/types/auth/Auth';
import { EaasiRoles } from '@/types/auth/User';

/**
 * Base class for Controllers that handle user-owned CRUD logic
 */
export default abstract class UserOwnedCrudController<T extends EaasiUserOwnedModel> extends BaseCrudController<T> {

	/**
	 * Gets a resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req: IAuthorizedGetRequest, res: Response) {
		const id = Number(req.params.id);

		if (req.params['id'] == null) {
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

		if (response.result.userId !== req.user.id) {
			return res.status(HttpResponseCode.UNAUTHORIZED).send();
		}

		return res.status(HttpResponseCode.OK).send(response.result);
	}

	/**
	 * Creates a new resource and persists to database
	 * @param req request
	 * @param res response
	 */
	async create(req: IAuthorizedPostRequest<T>, res: Response) {
		const newObject = req.body;

		if (newObject == null) {
			return res
				.status(HttpResponseCode.BAD_REQUEST)
				.send(build_400_response(JSON.stringify(req.body)));
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
	async update(req: IAuthorizedPutRequest<T>, res: Response) {
		const id = Number(req.params['id']);
		const updateData = req.body;
		let existing = await this.service.getByPk(id);
		if(!existing.result) {
			res.status(HttpResponseCode.BAD_REQUEST).send({error: 'Invalid id'});
		}
		if (req.user.roleId !== EaasiRoles.ADMIN && existing.result.userId !== req.user.id) {
			return res.status(HttpResponseCode.UNAUTHORIZED).send();
		}
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
	async delete(req: IAuthorizedDeleteRequest, res: Response) {
		const id = Number(req.params.id);
		let existing = await this.service.getByPk(id);
		if(!existing.result) {
			res.status(HttpResponseCode.BAD_REQUEST).send({error: 'Invalid id'});
		}
		if (req.user.roleId !== EaasiRoles.ADMIN && existing.result.userId !== req.user.id) {
			return res.status(HttpResponseCode.UNAUTHORIZED).send();
		}
		let deleteResponse = await this.service.destroy(id);

		if (deleteResponse.hasError) {
			return BaseCrudController._handleDeleteError(req, res, deleteResponse);
		}

		return res.status(HttpResponseCode.OK).send(deleteResponse);
	}

	/**
	 * Formats an express-validator error message when a malformed request is made
	 * @param req request
	 * @param res response
	 * @param errors express-validator Result errors
	 */
	async sendMalformedRequestResponse(req: IAuthorizedRequest, res: Response, errors: Result<any>) {
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
		res.send(build_400_response(errorMessage));
	}

	/**
	 * Handles sending an error response for an update action
	 * @param req Express req
	 * @param res Express res
	 * @param updateResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	static async _handleUpdateError(req: IAuthorizedRequest, res: Response, updateResponse: any) {
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
	static async _handleDeleteError(req: IAuthorizedRequest, res: Response, deleteResponse: any) {
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
