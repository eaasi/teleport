import EmulationProjectController from '@/controllers/EmulationProjectController';
import EmulationProjectResourceController, { IGetEmulationProjectResourcesRequest } from '@/controllers/EmulationProjectResourceController';
import TempEnvironmentController from '@/controllers/TempEnvironmentController';
import { EmulationProject } from '@/data_access/models/app';
import { IAuthorizedGetRequest, IAuthorizedPutRequest } from '@/types/auth/Auth';
import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();
const controller = new EmulationProjectController();
const resourcesController = new EmulationProjectResourceController();
const tempEnvController = new TempEnvironmentController();

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

router.get('/add-to-temp',
	[check('id').isString()],
	(req: IAuthorizedGetRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? tempEnvController.sendMalformedRequestResponse(req, res, errors)
			: tempEnvController.addToTempArchive(req, res);
	});

router.delete('/delete-from-temp',
	[check('id').isString()],
	(req: IAuthorizedGetRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? tempEnvController.sendMalformedRequestResponse(req, res, errors)
			: tempEnvController.deleteFromTempArchive(req, res);
	});

module.exports = router;
