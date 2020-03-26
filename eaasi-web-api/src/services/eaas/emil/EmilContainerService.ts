import HttpJSONService from '@/services/base/HttpJSONService';
import IHttpService from '@/services/interfaces/IHttpService';
import { IObjectClassificationRequest, TaskState } from '@/types/emil/Emil';

const EMIL_SERVICE_ENDPOINT = process.env.EMIL_SERVICE_ENDPOINT;

export default class EmilContainerService {

	private readonly _svc: IHttpService;

	constructor(httpService = new HttpJSONService()) {
		this._svc = httpService;
	}

	/**
	 * Gets the Container Task State for a given taskID
	 * @param taskID
	 */
	async getTaskState(taskId: number | string): Promise<TaskState> {
		if (isNaN(Number(taskId))) {
			throw `taskId must be a string or number. Received ${taskId}`;
		}
		let response = await this._svc.get(`${EMIL_SERVICE_ENDPOINT}/tasks/${taskId}`);
		return await response.json() as TaskState;
	}

	async deleteTask(taskId: number | string): Promise<void> {
		if (isNaN(Number(taskId))) {
			throw `taskId must be a string or number. Received ${taskId}`;
		}
		await this._svc.delete(`${EMIL_SERVICE_ENDPOINT}/tasks/${taskId}`)
	}

	/**
	 * creates a task to detect environments that uses requested software
	 * @param classifyRequest: {
	 * 	archiveId: string;
	 *  objectId: string;
	 *  updateClassification: boolean;
	 *  updateProposal: boolean;
	 * }
	 */
	async classify(classifyRequest: IObjectClassificationRequest) {
		if(!classifyRequest) throw 'Did not receive Classification Request.';
		let response = await this._svc.post(`${EMIL_SERVICE_ENDPOINT}/classification`, classifyRequest);
		return await response.json();
	}
	
}