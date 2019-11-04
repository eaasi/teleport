import Bookmark from '@/data_access/models/app/Bookmark';
import CrudService from '../base/CrudService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import CrudServiceResult from '../base/CrudServiceResult';

/**
 * Handles CRUD operations for Bookmarks
 */
export default class EaasiBookmarkService extends CrudService<Bookmark> {
	constructor() {
		super(Bookmark)
	}

	async getByUserID(userID: number): Promise<ICrudServiceResult<Bookmark>> {
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
}
