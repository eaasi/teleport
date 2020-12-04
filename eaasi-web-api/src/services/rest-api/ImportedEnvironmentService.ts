import { UserImportedEnvironment } from '@/data_access/models/app';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Handles CRUD operations for User-Imported Environment
 */
export default class ImportedEnvironmentService extends CrudService<UserImportedEnvironment> {
	constructor() {
		super(UserImportedEnvironment)
	}

	/**
	 * Gets all Imported Environment for a User
	 * @param userId: number PK for the User
	 */
	async getByUserID(userId: number): Promise<ICrudServiceResult<UserImportedEnvironment[]>> {
		return this.model
    		.findAll({
				where: {
					userId: userId
				},
				raw: true
			})
			.then((result: UserImportedEnvironment) => {
    			return new CrudServiceResult(null, result);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
    		});
	}
}
