import EmulationProjectController from '@/controllers/EmulationProjectController';
import EmulationProjectResourceController, { IClearProjectResourceRequest, IDeleteEmulationProjectResourceRequest, IGetEmulationProjectResourcesRequest } from '@/controllers/EmulationProjectResourceController';
import { EmulationProjectResource } from '@/data_access/models/app';
import { IAuthorizedGetRequest, IAuthorizedPostRequest } from '@/types/auth/Auth';
import { ResourceType } from '@/types/resource/Resource';
import { IEaasiTaskSuccessor } from "@/types/task/Task";
import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();
const controller = new EmulationProjectController();
const resourcesController = new EmulationProjectResourceController();


router.get('/get-for-user', (req: IAuthorizedGetRequest, res: Response) =>
	controller.getForUser(req, res)
);

router.get('/:projectId/resources',
	[check('projectId').isNumeric()],
	(req: IGetEmulationProjectResourcesRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.getForProject(req, res);
	});

router.post('/:projectId/resources/',
	[check('projectId').isNumeric()],
	(req: IAuthorizedPostRequest<EmulationProjectResource>, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.create(req, res);
	});

router.post('/:projectId/delete-resources',
	[check('projectId').isNumeric()],
	(req: IAuthorizedPostRequest<ResourceType[]>, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.deleteForTypes(req, res)
	}
);

router.delete('/:projectId/resources/:resourceId',
	[check('projectId').isNumeric()],
	(req: IDeleteEmulationProjectResourceRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.delete(req, res);
	});

router.delete('/:projectId/clear-all',
	[check('projectId').isNumeric()],
	(req: IClearProjectResourceRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: controller.clearAllResources(req, res);
});

router.post('/add-task-successor', (req: IAuthorizedPostRequest<IEaasiTaskSuccessor>, res: Response) =>
	controller.addSuccessor(req, res)
);

module.exports = router;
