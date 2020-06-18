import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';
import EmulationProjectResourceController from '@/controllers/EmulationProjectResourceController';
import { IAuthorizedPostRequest, IAuthorizedPutRequest, IAuthorizedDeleteRequest } from '@/types/auth/Auth';
import { EmulationProjectResource } from '@/data_access/models/app';

const router = express.Router();
const controller = new EmulationProjectResourceController();

router.post('/',
	(req: IAuthorizedPostRequest<EmulationProjectResource>, res: Response) => {
		return controller.create(req, res);
	});

router.put('/:id',
	[check('id').isNumeric()],
	(req: IAuthorizedPutRequest<EmulationProjectResource>, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.update(req, res);
	});

router.delete('/:id',
	[check('id').isNumeric()],
	(req: IAuthorizedDeleteRequest, res: Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.delete(req, res);
	});

module.exports = router;
