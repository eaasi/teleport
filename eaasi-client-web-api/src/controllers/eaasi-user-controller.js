import EaasiUserService from "../services/eaasi-user-service";
import BaseController from "./base-controller";

class EaasiUserController extends BaseController {

	constructor() {
		super(new EaasiUserService());
		this.userService = new EaasiUserService();
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
