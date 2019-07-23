import EaasiUserService from "../services/eaasi-user-service";

class EaasiUserController {

	constructor() {
		this.userService = new EaasiUserService();
	}

	/**
	 * Gets all EaasiUser data (paginated)
	 * @param req request
	 * @param res response
	 */
	async getAll(req, res) {
		let limit = req.query.limit;
		let page = req.query.page || 1;
		await this.userService.getAll(limit, page, res, 'id')
	}

	/**
	 * Gets an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req, res) {
		const id = req.params.id;
		await this.userService.getByPk(id, res)
	}

	/**
	 * Creates a new EaasiUser resource
	 * @param req request
	 * @param res response
	 */
	async create(req, res) {
		const userData = req.body;
		await this.userService.create(userData, res)
	}

	/**
	 * Updates an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req, res) {
		const id = req.params.id;
		const userData = req.body;
		await this.userService.update(id, userData, res)
	}

	/**
	 * Delete an EaasiUser resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req, res) {
		const id = req.params.id;
		await this.userService.destroy(id, res);
	}
}

module.exports = EaasiUserController;
