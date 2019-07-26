import {build_404_response, build_500_response} from "../utils/json_response_helpers";

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
		let response = await this.entityService.getAll(limit, page, 'id')

		if (response.hasError) {
			await res.send(
				build_500_response(response.error)
			)
		}

		await res.send(response.result);
	}

	/**
	 * Gets an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req, res) {
		const id = req.params.id;

		let response = await this.entityService.getByPk(id)

		if (response.hasError) {
			await res.send(
				build_500_response(response.error)
			)
		}

		if (response.result == null) {
			await res.send(
				build_404_response(req.originalUrl)
			)
		}

		await res.send(response.result)
	}
}