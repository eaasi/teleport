import express from "express";

let router = express.Router();

const EaasiRoleController = require('../controllers/EaasiUserController');
const controller = new EaasiRoleController();

router.get('/', (req: Express.Request, res: Express.Response) => controller.getAll(req, res));
router.get('/:id', (req: Express.Request, res: Express.Response) => controller.get(req, res));
router.post('/', (req: Express.Request, res: Express.Response) => controller.create(req, res));
router.put('/:id', (req: Express.Request, res: Express.Response) => controller.update(req, res));
router.delete('/:id', (req: Express.Request, res: Express.Response) => controller.delete(req, res));

module.exports = router;
