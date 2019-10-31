import CrudService from '../base/CrudService';
import ICrudServiceResult from '../interfaces/ICrudServiceResult';
import CrudServiceResult from '../base/CrudServiceResult';
const { Bookmark } = require('@/data_access/models');
import Sequelize from 'sequelize';

/**
 * Handles CRUD operations for Bookmarks
 */
export default class EaasiBookmarkService extends CrudService {
    constructor() {
        super(Bookmark)
    }

    async getByUserID(userID: number): Promise<ICrudServiceResult> {
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
