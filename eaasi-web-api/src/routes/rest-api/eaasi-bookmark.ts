import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import EaasiBookmarkController from '@/controllers/rest-api/EaasiBookmarkController.ts';

const router = express.Router();

const controller = new EaasiBookmarkController();

router
    .get('/', (req, res) => controller.getByUserID(req, res))
    .post('/', (req, res) => controller.create(req, res))
    .delete('/', (req, res) => controller.delete(req, res));

// router.post('/', (req: Express.Request, res: Express.Response) => {
//     return controller.create(req, res);
// });

// router.delete('/:id',
// 	[check('id').isNumeric()],
// 	(req: Express.Request, res: Express.Response) => {
// 		const errors = validationResult(req);
// 		return !errors.isEmpty()
// 			? controller.sendMalformedRequestResponse(req, res, errors)
// 			: controller.delete(req, res);
//     });

module.exports = router;