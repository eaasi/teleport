import {build_400_response, build_404_response, build_500_response} from "../utils/error_helpers";

export default class BaseController {
	constructor(entityService) {
		this.entityService = entityService
	}

	/**
	 * Gets all EaasiUser data (paginated)
	 * @param req request
	 * @param res response
	 */
	async getAll(req, res) {
		let limit = req.query.limit;
		let page = req.query.page || 1;
		let sortCol = req.query.sortCol;
		let response = await this.entityService.getAll(limit, page, sortCol)

		if (response.hasError) {
			return await res.send(build_500_response(response.error))
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
			return await res.send(build_400_response(req.params))
		}

		let response = await this.entityService.getByPk(id)

		if (response.hasError) {
			return await res.send(build_500_response(response.error));
		}

		if (response.result == null) {
			return await res.send(build_404_response(req.originalUrl));
		}

		return await res.send(response.result)
	}
}