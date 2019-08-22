import CrudService from "./base/CrudService";

const { EaasiUser } = require("../data_access/models");

/**
 * Handles CRUD operations for EaasIUser domain
 */
export default class EaasiUserService extends CrudService {
    constructor() {
        super(EaasiUser);
	}

	async getByEmail(email: string) {
		return await this.model.findOne({
			where: {
				email
			}
		});
	}
}
