import {build_400_response, build_404_response, build_500_response} from "../utils/error_helpers";
import {BAD_REQUEST, CREATED, NOT_FOUND, OK, SERVER_ERROR} from "../utils/http_helpers";

export default class BaseController {
	constructor(entityService) {
		this._entityService = entityService
	}

	/**
	 * Gets all EaasiUser data (paginated)
	 * @param req request
	 * @param res response
	 */
	async getAll(req, res) {
		let limit = req.query.limit || 100;
		let page = req.query.page || 1;
		let sortCol = req.query.sortCol;

		if (!Number.isInteger(limit) || !Number.isInteger(page)) {
			console.log(req.query)
			return await res.status(BAD_REQUEST)
				.send(build_400_response(JSON.stringify(req.query)))
		}

		let response = await this._entityService.getAll(limit, page, sortCol)

		if (response.hasError) {
			return await res.status(SERVER_ERROR)
				.send(build_500_response(response.error))
		}

		return await res.send(response.result);
	}

	/**
	 * Gets an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req, res) {
		const id = req.params.id;

		if (req.params.id == null) {
			return await res.status(BAD_REQUEST).send(build_400_response(req.params))
		}

		let response = await this._entityService.getByPk(id)

		if (response.hasError) {
			return await res.status(SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		if (response.result == null) {
			return await res.status(NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return await res.status(OK)
			.send(response.result)
	}

	/**
	 * Creates a new EaasiUser resource
	 * @param req request
	 * @param res response
	 */
	async create(req, res) {
		const newObject = req.body;

		if (newObject == null) {
			return await res.status(BAD_REQUEST)
				.send(build_400_response(req.body))
		}

		let response = await this._entityService.create(newObject)

		if (response.hasError) {
			return await res.status(SERVER_ERROR)
				.send(build_500_response(response.error))
		}

		return await res.status(CREATED)
			.send(response.result)
	}

	/**
	 * Updates an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req, res) {
		const id = req.params.id;
		const updateData = req.body;
		let updateResponse = await this._entityService.update(id, updateData)

		if (updateResponse.hasError) {
			return this._handleUpdateError(req, res, updateResponse);
		}

		return await res.status(OK).send(updateResponse)
	}

	/**
	 * Delete an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req, res) {
		const id = req.params.id;
		let deleteResponse = await this._entityService.destroy(id);

		if (deleteResponse.hasError) {
			return this._handleDeleteError(req, res, deleteResponse);
		}

		return await res.status(OK).send(deleteResponse)
	}

	/**
	 *
	 * @param req Express req
	 * @param res Express res
	 * @param updateResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	async _handleUpdateError(req, res, updateResponse) {
		if (updateResponse.error === "notFound") {
			return await res.status(SERVER_ERROR)
				.send(build_404_response(req.originalUrl));
		}

		return await res.status(SERVER_ERROR)
			.send(build_500_response(updateResponse.error));
	}

	/**
	 *
	 * @param req Express req
	 * @param res Express res
	 * @param deleteResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	async _handleDeleteError(req, res, deleteResponse) {
		if (deleteResponse.error === "notFound") {
			return await res.status(SERVER_ERROR)
				.send(build_404_response(req.originalUrl));
		}

		return await res.status(SERVER_ERROR)
			.send(build_500_response(deleteResponse.error));
	}
}