import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const EaasiBookmarkController = require('@/controllers/rest-api/EaasiBookmarkController');
const controller = new EaasiBookmarkController();

router.get('/', (req: Express.Request, res: Express.Response) => {
    return controller.getAll(req, res);
});

router.post('/', 
    [check('resourceID').isNumeric()],
    (req: Express.Request, res: Express.Response) => {
        const errors = validationResult(req);
        return controller.create(req, res, errors);
});

module.exports = router;