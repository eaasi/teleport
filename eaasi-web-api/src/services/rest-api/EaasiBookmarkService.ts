import { Bookmark } from '@/data_access/models/app/Bookmark';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';

/**
 * Handles CRUD operations for Bookmarks
 */
export default class EaasiBookmarkService extends CrudService<Bookmark> {
	constructor() {
		super(Bookmark)
	}

	/**
	 * Gets all Bookmarks for a User
	 * @param userID: number PK for the User
	 */
	async getByUserID(userID: number): Promise<ICrudServiceResult<Bookmark[]>> {
		return await this.model
    		.findAll({
				where: {
					userID: userID
				}
			})
			.then((result: object) => {
    			return new CrudServiceResult(null, result);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
    		});
	}

	/**
	 * Removes all Bookmarks for a User
	 * @param userID: number PK for the User
	 */
	async destroyAll(userID: number) {
		return await this.model
			.destroy({
				where: {
					userID: userID
				}
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
