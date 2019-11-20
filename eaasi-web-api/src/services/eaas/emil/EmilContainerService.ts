import HttpJSONService from '@/services/base/HttpJSONService';
import IHttpService from '@/services/interfaces/IHttpService';
import { TaskState } from '@/types/emil/Emil';

const BASE_URL = process.env.EAAS_JAVA_SERVICE_URL + '/emil';

export default class EmilContainerService {

	private readonly _svc: IHttpService;

	constructor(httpService = new HttpJSONService()) {
		this._svc = httpService;
	}

	/**
	 * Gets the Container Task State for a given taskID
	 * @param taskID
	 */
	async getTaskState(taskID: number | string): Promise<TaskState> {
		if (isNaN(Number(taskID))) {
			throw `taskID must be a string or number. Received ${taskID}`;
		}
		let response = await this._svc.get(`${BASE_URL}/tasks/${taskID}`);
		return await response.json() as TaskState;
	}
}
