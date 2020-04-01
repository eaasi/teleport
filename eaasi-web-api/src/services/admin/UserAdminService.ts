import { EaasiRole } from '@/data_access/models/app/EaasiRole';
import { EaasiUser } from '@/data_access/models/app/EaasiUser';
import CrudQuery from '@/services/base/CrudQuery';
import CrudService from '@/services/base/CrudService';
import ICrudService from '@/services/interfaces/ICrudService';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';
import UserService from '../user/UserService';


/**
 * Handles business logic related to working with User and Role data
 */
export default class UserAdminService extends UserService {

	private readonly _roleCrudService: ICrudService<EaasiRole>;
	readonly _userCrudService: ICrudService<EaasiUser>;

	constructor(
		userCrudService: ICrudService<EaasiUser> = new CrudService<EaasiUser>(EaasiUser),
		roleCrudService: ICrudService<EaasiRole> = new CrudService<EaasiRole>(EaasiRole),
	) {
		super();
		this._roleCrudService = roleCrudService;
		this._userCrudService = userCrudService;
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
	 * Saves (Create or Update) a User by id / User instance
	 * @param id: number User PK
	 * @param user: User instance
	 */
	async saveUser(id: number, user: object) {
		let result: ICrudServiceResult<EaasiUser>;

		if (id) {
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
	 * Sets the a last login date to now for the EaasiUser with the provided userId
	 * @param userId: number User PK
	 */
	async setUserLastLogin(userId: number) {
		let now = Date.now();
		if (await this._userCrudService.getByPk(userId)) {
			return await this._userCrudService.update(userId, {lastLogin: now});
		}
		return null;
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
