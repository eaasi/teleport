import { EaasiTask } from '@/data_access/models/app/EaasiTask';
import CrudService from '../base/CrudService';
import CrudServiceResult from '../base/CrudServiceResult';

/**
 * Handles CRUD operations for EaasiTasks
 */
export default class EaasiTaskService extends CrudService<EaasiTask> {
	constructor() {
		super(EaasiTask)
	}

	/**
	 * Gets eaasi task by provided taskId
	 * @param req request
	 * @param res response
	 */
	async getByTaskId(taskId: string) {
		return await this.model
    		.findAll({
				where: {
					taskId: taskId
				}
			})
			.then((result: object) => {
    			return new CrudServiceResult(null, result[0]);
    		})
    		.catch((error: string) => {
				this._logger.log.error(error);
    			return new CrudServiceResult(error);
    		});
	}
}
