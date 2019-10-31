import BaseService from '@/services/base/BaseService';
import CrudQuery from '@/services/base/CrudQuery';
import CrudService from '@/services/base/CrudService';
import ICrudService from '@/services/interfaces/ICrudService';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';
const { EaasiUser } = require('@/data_access/models/metadata');
const { EaasiRole } = require('@/data_access/models/metadata');


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

	/**
	 * Gets all Users using a CrudQuery
	 * @param query: CrudQuery
	 */
	async getUsers(query: CrudQuery) {
		let result = await this._userCrudService.getAll(query);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	/**
	 * Gets a User by Id
	 * @param id: number User PK
	 */
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

	/**
	 * Gets a User by Email address
	 * @param email: string email address
	 */
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

	/**
	 * Saves (Create or Update) a User by id / User instance
	 * @param id: number User PK
	 * @param user: User instance
	 */
	async saveUser(id: number, user: object) {
		let result: ICrudServiceResult;
		if(id) {
			result = await this._userCrudService.update(id, user);
		} else {
			result = await this._userCrudService.create(user);
		}

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	/**
	 * Deletes a User by id
	 * @param id: number User PK
	 */
	async deleteUser(id: number) {
		let result = await this._userCrudService.destroy(id);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

	/* Roles
	============================================*/

	/**
	 * Gets a list of all UserRoles
	 */
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
