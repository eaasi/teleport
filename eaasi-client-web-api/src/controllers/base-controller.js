import {build_404_response} from "../utils/json_response_helpers";

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
		let users = await this.entityService.getAll(limit, page, 'id')
		await res.send(users);
	}

	/**
	 * Gets an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req, res) {
		const id = req.params.id;
		let user = await this.entityService.getByPk(id)

		if (user == null) {
			await res.send(
				build_404_response(req.originalUrl)
			)
		}

		await res.send(user)
	}

}