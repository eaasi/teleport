import { EaasiUser } from '@/data_access/models/app/EaasiUser';
import BaseService from '@/services/base/BaseService';
import CrudService from '@/services/base/CrudService';
import ICrudService from '@/services/interfaces/ICrudService';


/**
 * Handles business logic related to working with User and Role data
 */
export default class UserService extends BaseService {

	readonly _userCrudService: ICrudService<EaasiUser>;

	constructor(
		userCrudService: ICrudService<EaasiUser> = new CrudService<EaasiUser>(EaasiUser),
	) {
		super();
		this._userCrudService = userCrudService;
	}
    
	/**
	 * Gets a User by Email address
	 * @param email: string email address
	 */
	async getUserByEmail(email: string): Promise<EaasiUser> {
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
	 * Gets a User by Id
	 * @param id: number User PK
	 */
	async getUser(id: string) {
		let result = await this._userCrudService.getByPk(id);

		if (result.hasError) {
			throw result.error;
		}

		if (result.result === null) {
			throw `Cannot find user with id: ${id}`
		}

		return result.result;
	}

	async recordLastLogin(userId: string) {
		let result = await this._userCrudService.update(userId, { lastLogin: new Date() });

		if (result.hasError) {
			throw result.error;
		}

		if (result.result === null) {
			throw `Cannot find user with id: ${userId}`
		}
	}

}
