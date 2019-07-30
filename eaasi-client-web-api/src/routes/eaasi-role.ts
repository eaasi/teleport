import express from "express";

const router = express.Router();

const EaasiRoleController = require('../controllers/EaasiRoleController');
const controller = new EaasiRoleController();

router.get('/', (req: express.Request, res: express.Response) => controller.getAll(req, res));
router.get('/:id', (req: express.Request, res: express.Response) => controller.get(req, res));
router.post('/', (req: express.Request, res: express.Response) => controller.create(req, res));
router.put('/:id', (req: express.Request, res: express.Response) => controller.update(req, res));
router.delete('/:id', (req: express.Request, res: express.Response) => controller.delete(req, res));

module.exports = router;
