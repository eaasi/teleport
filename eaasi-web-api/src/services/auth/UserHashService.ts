import { IEaasiUserHash } from '@/data_access/interfaces/IEaasiUserHash';
import { EaasiUserHash } from '@/data_access/models/app/EaasiUserHash';
import CrudService from '@/services/base/CrudService';
import ICrudService from '@/services/interfaces/ICrudService';
import BaseService from '../base/BaseService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Handles business logic related to working with User and Role data
 */
export default class UserHashService extends BaseService {

	private readonly _userHashCrudService: ICrudService<EaasiUserHash>;

	constructor(
		userCrudService: ICrudService<EaasiUserHash> = new CrudService<EaasiUserHash>(EaasiUserHash),
	) {
		super();
		this._userHashCrudService = userCrudService;
	}

	/**
	 * Gets a User Hash by User Id
	 * @param userId: number User PK
	 */
	async getUserHash(userId: number) {
		let result = await this._userHashCrudService.getByPk(userId);

		if (result.hasError) {
			throw result.error;
		}

		if (result.result === null) {
			throw `Cannot find user with id: ${userId}`
		}

		return result.result;
	}

	/**
	 * Saves / Creates a User Hash by user id and hash
	 * @param { userId: number, hash: string }
	 */
	async saveUserHash(userHash: IEaasiUserHash) {
		const existingUserHash = await this._userHashCrudService.getByPk(userHash.userId);
		let result: ICrudServiceResult<EaasiUserHash>;

		if (existingUserHash.result != null) {
			result = await this._userHashCrudService.update(userHash.userId, userHash);
		} else {
			result = await this._userHashCrudService.create(userHash);
		}
		
		if (result.hasError) {
			throw result.error;
		}

		return result.result;	
	}

	/**
	 * Deletes a User Hash by user id
	 * @param userId: number User Hash PK
	 */
	async deleteUserHash(userId: number) {
		let result = await this._userHashCrudService.destroy(userId);

		if (result.hasError) {
			throw result.error;
		}

		return result.result;
	}
	

}
