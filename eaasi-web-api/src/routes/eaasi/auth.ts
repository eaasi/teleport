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
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Log In a user
 *
 * @apiSuccess {[]Object} Logs a user in and redirects a user to the homepage.
 */
router.get('/login', samlAuth, controller.login);

/**
 * @api {post} auth/callback SAML callback URL
 * @apiVersion 1.0.0
 * @apiName Callback
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Log In a user
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/callback', samlAuth, controller.callback);

/**
 * @api {post} auth/user Creates a new User
 * @apiVersion 1.0.0
 * @apiName User
 * @apiGroup Auth
 * @apiPermission System Administrator only
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/user', jwtAuth, controller.user);

/**
 * @api {post} auth/logout Logs out a user
 * @apiVersion 1.0.0
 * @apiName Import Emulator
 * @apiGroup Auth
 * @apiPermission Any
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.delete('/logout', jwtAuth, controller.logout);

/**
 * @api {post} auth/refresh
 * @apiVersion 1.0.0
 * @apiName Refresh
 * @apiGroup Auth
 * @apiPermission Administrator only
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/refresh', jwtAuth, controller.refresh);

/**
 * @api {post} auth/Shibboleth.sso/Metadata
 * @apiVersion 1.0.0
 * @apiName Shibboleth.sso Metadata
 * @apiGroup Auth
 * @apiPermission Any
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/Shibboleth.sso/Metadata', controller.shibbolethXml);

module.exports = router;
