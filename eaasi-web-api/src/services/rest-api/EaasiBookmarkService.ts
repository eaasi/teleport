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
	 * @param userId: string PK for the User
	 */
	async getByUserID(userId: string): Promise<ICrudServiceResult<Bookmark[]>> {
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

	/**
	 * Removes all Bookmarks for a User
	 * @param userID: number PK for the User
	 */
	async destroyAll(userId: string) {
		return await this.model
			.destroy({
				where: {
					userId: userId
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
	 * Removes all Bookmarks for all resources passed
	 * @param resourceIds: string[]
	 */
	async destroyAllByResources(resourceIds: string[]) {
		return await this.model
			.destroy({
				where: {
					resourceId: resourceIds
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
	 * Removes all Bookmarks for all resources passed
	 * @param resourceIds: string[]
	 */
	async destroyAllByResource(resourceId: string) {
		return await this.model
			.destroy({
				where: {
					resourceId
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
