import EaasiRoleService from "../services/eaasi-role-service";
import BaseController from "./base-controller";

class EaasiRoleController extends BaseController {

	constructor() {
		super(new EaasiRoleService());
		this.roleService = new EaasiRoleService();
	}

	/**
	 * Creates a new EaasiRole resource
	 * @param req request
	 * @param res response
	 */
	async create(req, res) {
		const roleData = req.body;
		await this.roleService.create(roleData)
	}

	/**
	 * Updates an EaasiRole resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req, res) {
		const id = req.params.id;
		const roleData = req.body;
		await this.roleService.update(id, roleData)
	}

	/**
	 * Delete an EaasiRole resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req, res) {
		const id = req.params.id;
		await this.roleService.destroy(id);
	}
}

module.exports = EaasiRoleController;
