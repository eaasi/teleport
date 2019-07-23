const express = require('express');
const router = express.Router();

const EaasiAuthController = require('../controllers/eaasi-auth-controller');
const controller = new EaasiAuthController();

router.post('/login', (req, res) => controller.login(req, res));
router.delete('/logout', (req, res) => controller.logout(req, res));
router.post('/refresh', (req, res) => controller.refresh(req, res));

module.exports = router;
