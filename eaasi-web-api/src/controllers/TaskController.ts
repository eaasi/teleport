import BaseController from './base/BaseController';
import { Request, Response } from 'express';
import EmilContainerService from '@/services/eaas/emil/EmilContainerService';
import EmilEnvironmentService from '@/services/eaas/emil/EmilEnvironmentService';

export default class TaskController extends BaseController {

	private readonly emilContainerService: EmilContainerService;
	private readonly emilEnvironmentService: EmilEnvironmentService;

	constructor(emilContainerService = new EmilContainerService(), emilEnvironmentService = new EmilEnvironmentService()) {
		super();
		this.emilContainerService = emilContainerService;
		this.emilEnvironmentService = emilEnvironmentService;
	}

	async getEmilContainerTaskState(req: Request, res: Response) {
		try {
			let taskID = req.query.id;
			console.log('::: TaskController getEmilContainerTaskState ::: taskID', taskID);
			let taskState = await this.emilContainerService.getTaskState(taskID);
			res.send(taskState);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}

	async getEmilEnvironmentTaskState(req: Request, res: Response) {
		try {
			let taskID = req.query.id;
			let environmentService = new EmilEnvironmentService();
			let taskState = await environmentService.getEnvironmentTaskState(taskID);
			res.send(taskState);
		} catch(e) {
			this.sendError(e.message, res);
		}
	}
}
