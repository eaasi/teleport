import ICrudService from '../interfaces/ICrudService';
import CrudService from '../base/CrudService';
import EaasiUser from '@/data_access/models/eaasiUser';
import EaasiRole from '@/data_access/models/eaasiRole';
import CrudQuery from '../base/CrudQuery';
import BaseService from '../base/BaseService';

export default class UserService extends BaseService {

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
		let result = await this._userCrudService.getWhere({email});

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
		query.limit = Infinity;
		let result = await this._roleCrudService.getAll(query);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}

}
