import BaseController from './base/BaseController';
import { Request, Response } from 'express';
import EmilContainerService from '@/services/eaas/emil/EmilContainerService';

export default class TaskController extends BaseController {

	private readonly _emilSvc: EmilContainerService;

	constructor(emilContainerService = new EmilContainerService()) {
		super();
		this._emilSvc = emilContainerService;
	}

	async getEmilTaskState(req: Request, res: Response) {
		try {
			let taskID = req.query.id;
			let taskState = await this._emilSvc.getTaskState(taskID);
			res.send(taskState);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

}