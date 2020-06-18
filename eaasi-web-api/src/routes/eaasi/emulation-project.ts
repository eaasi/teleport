import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';
import EmulationProjectController from '@/controllers/EmulationProjectController';
import { IAuthorizedGetRequest, IAuthorizedPutRequest } from '@/types/auth/Auth';
import { EmulationProject } from '@/data_access/models/app';
import EmulationProjectResourceController, { IGetEmulationProjectResourcesRequest } from '@/controllers/EmulationProjectResourceController';

const router = express.Router();
const controller = new EmulationProjectController();
const resourcesController = new EmulationProjectResourceController();

router.get('/get-for-user', (req: IAuthorizedGetRequest, res: Response) => {
	controller.getForUser(req, res);
});

router.get('/:id',
	[check('id').isNumeric()],
	(req: IAuthorizedGetRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.get(req, res);
	});

router.put('/:id',
	[check('id').isNumeric()],
	(req: IAuthorizedPutRequest<EmulationProject>, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.update(req, res);
	});

router.get('/:projectId/resources',
	[check('projectId').isNumeric()],
	(req: IGetEmulationProjectResourcesRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? resourcesController.sendMalformedRequestResponse(req, res, errors)
			: resourcesController.getForProject(req, res);
	});

module.exports = router;
