import express from "express";

const router = express.Router();

const EaasiAuthController = require('../controllers/EaasiAuthController');
const controller = new EaasiAuthController();

router.post('/login', (req: express.Request, res: express.Response) => controller.login(req, res));
router.delete('/logout', (req: express.Request, res: express.Response) => controller.logout(req, res));
router.post('/refresh', (req: express.Request, res: express.Response) => controller.refresh(req, res));

module.exports = router;
