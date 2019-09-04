import express from 'express';
import passport from 'passport';
import EaasiAuthController from '../controllers/EaasiAuthController';

const router = express.Router();
const controller = new EaasiAuthController();

router.get('/user', passport.authenticate('jwt', {session: false}), controller.user);
router.post('/callback', passport.authenticate('saml', {session: false}), controller.callback);
router.delete('/logout', controller.logout);
router.post('/refresh', controller.refresh);
router.get('/Shibboleth.sso/Metadata', controller.shibbolethXml);

module.exports = router;