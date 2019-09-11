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
		return await this._userCrudService.getAll(query.limit, query.page, query.sortCol, query.descending);
	}

	async getUser(id: number) {
		let user = this._userCrudService.getByPk(id);
		return this
	}

	async getUser(email: string) {
		return await this._userCrudService.getWhere({email});
	}

	async saveUser(id: number, user: object) {
		return await this._userCrudService.update(id, user);
	}

	async deleteUser(id: number) {
		return await this._userCrudService.destroy(id);
	}

	/* Roles
	============================================*/

	async getRoles() {
		let query = new CrudQuery();
		query.limit = Infinity;
		return await this._roleCrudService.getAll(query.limit, query.page, query.sortCol, query.descending);
	}

}