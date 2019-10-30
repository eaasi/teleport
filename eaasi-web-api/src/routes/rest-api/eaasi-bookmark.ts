import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const EaasiBookmarkController = require('@/controllers/rest-api/EaasiBookmarkController.ts');
const controller = new EaasiBookmarkController();

router.get('/:userID', 
    [check('userID').isNumeric()],
        (req: Express.Request, res: Express.Response) => {
        return controller.getByUserID(req, res);
    });

router.post('/', (req: Express.Request, res: Express.Response) => {
    return controller.create(req, res);
});

router.delete('/:id',
	[check('id').isNumeric()],
	(req: Express.Request, res: Express.Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.delete(req, res);
    });

module.exports = router;