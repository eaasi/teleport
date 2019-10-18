import express from 'express';
import passport from 'passport';
import AuthController from '@/controllers/AuthController';

const router = express.Router();
const controller = new AuthController();
const samlAuth = passport.authenticate('saml', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

/**
 * @api {get} auth/login Log In
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 */
router.get('/login', samlAuth, controller.login);

/**
 * @api {post}  auth/callback SAML Callback Endpoint
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 */
router.post('/callback', samlAuth, controller.callback);

/**
 * @api {post} auth/user Request a User
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission System Administrator only
 */
router.get('/user', jwtAuth, controller.user);

/**
 * @api {post} auth/logout Log Out
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 */
router.delete('/logout', jwtAuth, controller.logout);

/**
 * @api {post} auth/refresh Refresh Auth Token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Administrator only
 */
router.post('/refresh', jwtAuth, controller.refresh);

/**
 * @api {post} auth/Shibboleth.sso/Metadata Request Shibboleth.sso Metadata
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 */
router.get('/Shibboleth.sso/Metadata', controller.shibbolethXml);

module.exports = router;
