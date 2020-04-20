import { UserImportedSoftware } from '@/data_access/models/app';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Handles CRUD operations for User-Imported Software
 */
export default class ImportedSoftwareService extends CrudService<UserImportedSoftware> {
	constructor() {
		super(UserImportedSoftware)
	}

	/**
	 * Gets all Imported Software for a User
	 * @param userID: number PK for the User
	 */
	async getByUserID(userID: number): Promise<ICrudServiceResult<UserImportedSoftware[]>> {
		return await this.model
    		.findAll({
				where: {
					userID: userID
				},
				raw: true
			})
			.then((result: object) => {
    			return new CrudServiceResult(null, result);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
    		});
	}
}
