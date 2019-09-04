import express from 'express';
import passport from 'passport';

const router = express.Router();

const EaasiAuthController = require('../controllers/EaasiAuthController');
const controller = new EaasiAuthController();

router.post('/login', passport.authenticate('saml', {session: false}), controller.login);
router.post('/callback', passport.authenticate('saml', {session: false}), controller.callback);
router.delete('/logout', controller.logout);
router.post('/refresh', controller.refresh);
router.get('/Shibboleth.sso', controller.shibbolethXml);

module.exports = router;
