import EaasiRoleService from "../services/eaasi-role-service";

class EaasiRoleController {

	constructor() {
		this.roleService = new EaasiRoleService();
	}

	/**
	 * Gets all EaasiRole data (paginated)
	 * @param req request
	 * @param res response
	 */
	async getAll(req, res) {
		let limit = req.query.limit;
		let page = req.query.page || 1;
		await this.roleService.getAll(limit, page, res, 'id')
	}

	/**
	 * Gets an EaasiRole resource by ID
	 * @param req request
	 * @param res response
	 */
	async get(req, res) {
		const id = req.params.id;
		await this.roleService.getByPk(id, res)
	}

	/**
	 * Creates a new EaasiRole resource
	 * @param req request
	 * @param res response
	 */
	async create(req, res) {
		const roleData = req.body;
		await this.roleService.create(roleData, res)
	}

	/**
	 * Updates an EaasiRole resource by ID
	 * @param req request
	 * @param res response
	 */
	async update(req, res) {
		const id = req.params.id;
		const roleData = req.body;
		await this.roleService.update(id, roleData, res)
	}

	/**
	 * Delete an EaasiRole resource by ID
	 * @param req request
	 * @param res response
	 */
	async delete(req, res) {
		const id = req.params.id;
		await this.roleService.destroy(id, res);
	}
}

module.exports = EaasiRoleController;
