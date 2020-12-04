import CrudQuery from '@/classes/CrudQuery';
import HttpResponseCode from '@/classes/HttpResponseCode';
import { EaasiTask } from '@/data_access/models/app';
import ICrudServiceResult from '@/services/interfaces/ICrudServiceResult';
import EaasiTaskService from '@/services/rest-api/EaasiTaskService';
import EmilTaskService from '@/services/task/EmilTaskService';
import { IAuthorizedDeleteRequest } from '@/types/auth/Auth';
import { TaskState } from '@/types/emil/Emil';
import { IEaasiTask } from '@/types/task/Task';
import { build_404_response, build_500_response } from '@/utils/error-helpers';
import { Request, Response } from 'express';
import BaseController from '../base/BaseController';

export default class EaasiTaskController extends BaseController {

	private readonly emilTaskService: EmilTaskService;
	private readonly taskService: EaasiTaskService;

	constructor(
		emilTaskService = new EmilTaskService(),
		taskService = new EaasiTaskService()
	) {
		super();
		this.taskService = taskService;
		this.emilTaskService = emilTaskService;
	}

	/**
	 * Gets all tasks
	 * @param req request
	 * @param res response
	 */
	async getAll(req: Request, res: Response) {
		const query = new CrudQuery();
		let response = await this.taskService.getAll(query);

		if (response.hasError) {
			return res
				.status(HttpResponseCode.SERVER_ERROR)
				.send(build_500_response(response.error));
		}

		if (response.result == null) {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return res.status(HttpResponseCode.OK).send(response.result);
	}

	/**
	 * Gets eaasi task by provided taskId
	 * @param req request
	 * @param res response
	 */
	async getState(req: Request, res: Response) {
		try {
			let taskId = req.params['taskId'];
			let emilTask: TaskState = await this.emilTaskService.getTaskState(taskId);
			const serviceResult = await this.taskService.getByTaskId(taskId);
			const eaasiTask: IEaasiTask = serviceResult && serviceResult.result ? serviceResult.result.dataValues : null;

			if (!emilTask) return this.sendError(new Error('Task not found'), res);

			let taskToSave = {
				...emilTask,
				taskId,
				userData: emilTask.userData ? JSON.stringify(emilTask.userData) : null,
			};

			if (!eaasiTask) {
				const response = await this.taskService.create(taskToSave);
				return res.send(response.result);
			}

			const response = await this.taskService.update(eaasiTask.id, taskToSave);
			return res.send(response.result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Deletes eaasi task by provided PK id
	 * @param req request
	 * @param res response
	 */
	async deleteTask(req: IAuthorizedDeleteRequest, res: Response) {
		try {
			let id = Number(req.params.id);
			const crudResult: ICrudServiceResult<EaasiTask> = await this.taskService.getByPk(id);
			const taskId = crudResult.result.getDataValue('taskId');
			let deleteApiResponse = await this.taskService.destroy(id);
			if (deleteApiResponse.hasError) {
				await this._handleDeleteError(req, res, deleteApiResponse);
			}

			let deleteResponse = await this.emilTaskService.deleteTask(taskId);
			res.status(HttpResponseCode.OK).send(deleteResponse);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Updates Eaasi Task description
	 * @param req request
	 * @param res response
	 */
	async updateTaskDescription(req: Request, res: Response) {
		try {
			let task: IEaasiTask = req.body;
			if (!task) return this.sendError(new Error('Task not found in request body'), res);
			const response = await this.taskService.update(task.id, { description: task.description });
			res.send(response.result);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
	 * Handles sending an error response for a delete action
	 * @param req Express req
	 * @param res Express res
	 * @param deleteResponse response object from ApiService
	 * @returns {Promise<*>}
	 * @private
	 */
	async _handleDeleteError(req: Request, res: Response, deleteResponse: any) {
		if (deleteResponse.error === 'notFound') {
			return res
				.status(HttpResponseCode.NOT_FOUND)
				.send(build_404_response(req.originalUrl));
		}

		return res
			.status(HttpResponseCode.SERVER_ERROR)
			.send(build_500_response(deleteResponse.error));
	}

}
