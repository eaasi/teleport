import express from "express";

const router = express.Router();

const EaasiAuthController = require('../controllers/EaasiAuthController');
const controller = new EaasiAuthController();

router.post('/login', controller.login);
router.delete('/logout', controller.logout);
router.post('/refresh', controller.refresh);

module.exports = router;
