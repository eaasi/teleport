import { UserImportedContent } from '@/data_access/models/app';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Handles CRUD operations for User-Imported Content
 */
export default class ImportedContentService extends CrudService<UserImportedContent> {
	constructor() {
		super(UserImportedContent)
	}

	/**
	 * Gets all Imported Content for a User
	 * @param userID: number PK for the User
	 */
	async getByUserID(userID: number): Promise<ICrudServiceResult<UserImportedContent[]>> {
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
