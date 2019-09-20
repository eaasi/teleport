import ICrudService from '../interfaces/ICrudService';
import CrudService from '../base/CrudService';
const { EaasiUser } = require('@/data_access/models');
const { EaasiRole } = require('@/data_access/models');
import CrudQuery from '../base/CrudQuery';
import BaseService from '../base/BaseService';


/**
 * Handles business logic related to working with User and Role data
 */
export default class UserAdminService extends BaseService {

	private readonly _userCrudService: ICrudService;
	private readonly _roleCrudService: ICrudService;

	constructor(
		userCrudService: ICrudService = new CrudService(EaasiUser),
		roleCrudService: ICrudService = new CrudService(EaasiRole)
	) {
		super();
		this._userCrudService = userCrudService;
		this._roleCrudService = roleCrudService;
	}

	/* Users
	============================================*/

	async getUsers(query: CrudQuery) {
		let result = await this._userCrudService.getAll(query);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	async getUser(id: number) {
		let result = await this._userCrudService.getByPk(id);

		if (result.hasError) {
			throw result.error;
		}

		if (result.result === null) {
			throw `Cannot find user with id: ${id}`
		}

		return result.result;
	}

	async getUserByEmail(email: string) {
		let result = await this._userCrudService.getOneWhere({email});

		if (result.hasError) {
			throw result.error;
		}

		if (result.result === null) {
			throw `Cannot find user with email: ${email}`
		}

		return result.result;
	}

	async saveUser(id: number, user: object) {
		let result = await this._userCrudService.update(id, user);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	async deleteUser(id: number) {
		let result = await this._userCrudService.destroy(id);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	/* Roles
	============================================*/

	async getRoles() {
		let query = new CrudQuery();

		query.limit = 10000;

		let result = await this._roleCrudService.getAll(query, true);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

}
