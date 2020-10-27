import { UserImportedImage } from '@/data_access/models/app/UserImportedImage';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
1

/**
 * Handles CRUD operations for User-Imported Image
 */
export default class ImportedImageService extends CrudService<UserImportedImage> {
	constructor() {
		super(UserImportedImage)
	}

	/**
	 * Gets all Imported Image for a User
	 * @param userID: number PK for the User
	 */
	async getByUserID(userId: number): Promise<ICrudServiceResult<UserImportedImage[]>> {
		return await this.model
    		.findAll({
				where: {
					userId: userId
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
