import express from 'express';
import passport from 'passport';
import AuthController from '@/controllers/AuthController';

const router = express.Router();
const controller = new AuthController();
const samlAuth = passport.authenticate('saml', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

router.get('/login', samlAuth, controller.login);
router.post('/callback', samlAuth, controller.callback);
router.get('/user', jwtAuth, controller.user);
router.delete('/logout', jwtAuth, controller.logout);
router.post('/refresh', jwtAuth, controller.refresh);
router.get('/Shibboleth.sso/Metadata', controller.shibbolethXml);

module.exports = router;