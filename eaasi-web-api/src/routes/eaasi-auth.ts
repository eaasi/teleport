import express from "express";
import passport from 'passport';

const router = express.Router();

const EaasiAuthController = require('../controllers/EaasiAuthController');
const controller = new EaasiAuthController();

router.post('/login', passport.authenticate('saml'), controller.login);
router.delete('/logout', controller.logout);
router.post('/refresh', controller.refresh);

module.exports = router;
