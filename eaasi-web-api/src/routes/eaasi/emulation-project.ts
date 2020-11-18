import EmulationProjectController from '@/controllers/EmulationProjectController';
import EmulationProjectResourceController, { IGetEmulationProjectResourcesRequest, IDeleteEmulationProjectResourceRequest } from '@/controllers/EmulationProjectResourceController';
import { EmulationProjectResource } from '@/data_access/models/app';
import { IAuthorizedGetRequest, IAuthorizedPostRequest } from '@/types/auth/Auth';
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

router.delete('/:projectId/resources/:resourceId',
	[check('projectId').isNumeric()],
	(req: IDeleteEmulationProjectResourceRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.delete(req, res);
	});


module.exports = router;
