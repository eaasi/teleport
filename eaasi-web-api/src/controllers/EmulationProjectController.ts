import HttpResponseCode from '@/classes/HttpResponseCode';
import { EmulationProject } from '@/data_access/models/app';
import EmulationProjectRoutine from '@/routines/EmulationProjectRoutine';
import EmulationProjectService from '@/services/rest-api/EmulationProjectService';
import EmulationProjectTaskSuccessorService from "@/services/rest-api/EmulationProjectTaskSuccessorService";
import { IAuthorizedGetRequest, IAuthorizedPostRequest } from '@/types/auth/Auth';
import { IEaasiTaskSuccessorRequest } from "@/types/task/Task";
import { build_404_response, build_500_response } from '@/utils/error-helpers';
import { Response } from 'express';
import UserOwnedCrudController from './base/UserOwnedCrudController';

export default class EmulationProjectController extends UserOwnedCrudController<EmulationProject> {
	
	private readonly routine: EmulationProjectRoutine;
	private readonly _successorService: EmulationProjectTaskSuccessorService;

	constructor(
		service: EmulationProjectService = new EmulationProjectService(),
		successorService = new EmulationProjectTaskSuccessorService(),
	) {
		super(service);
		this.routine = new EmulationProjectRoutine();
		this._successorService = successorService;
		this.routine.startAll();
	}

	/**
	 * Gets an Emulation Project by userId
	 */
	async getForUser(req: IAuthorizedGetRequest, res: Response) {
		try {
			let userId = req.user.id;
			let response = await this.service.getOneWhere({userId})
			if(!response.hasError && !response.result) {
				response = await this.service.create({userId})
			}
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

			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	async addSuccessor(req: IAuthorizedPostRequest<IEaasiTaskSuccessorRequest>, res: Response) {
		try {
			if (!req.body.envId || !req.body.emulationProjectId || !req.body.taskId || !req.user.id) {
				return this.sendClientError('Environment id, emulation project id and task id are required to create a successor', res);
			}
			const payload: IEaasiTaskSuccessorRequest = {
				...req.body,
				userId: req.user.id
			};
			let response = await this._successorService.create(payload);
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

			return res.send(response.result);
		} catch(e) {
			return this.sendError(e, res);
		}
	}

}