import AuthController from '@/controllers/AuthController';
import { authRequestLimit } from '@/middleware/request-limit';
import express from 'express';
import passport from 'passport';
import { IChangePasswordRequest } from '@/types/auth/Auth';

const router = express.Router();
const controller = new AuthController();
const samlAuth = passport.authenticate('saml', {session: false});
const jwtAuth = passport.authenticate('jwt', {session: false});

/**
 * @api {get} auth/login Log In
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Used to Log In a User.  The request is redirected by SAML middleware to the IDP with a SAML request.
 */
router.get('/login', samlAuth, controller.login);

/**
 * @api {get} auth/login Log In
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Used to Log In a User.
 */
router.post('/authenticate', authRequestLimit, (req, res) => controller.authenticate(req, res));

/**
 * @api {post}  auth/callback SAML Callback Endpoint
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Endpoint to which SAML assertions are posted.  This sets a cookie and redirects the user to the base client application URL. This route should be added to the IDP's list of Allowed Callback URLs.
 */
router.post('/callback', samlAuth, controller.callback);

/**
 * @api {post}  change password endpoint
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Any
 * @apiDescription Authorized route for changing a user's password
 */
router.post('/change-password', jwtAuth, (req, res) => controller.changePassword(req as IChangePasswordRequest, res));

/**
 * @api {get} auth/user Get User Data
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Authenticated User
 * @apiDescription Returns JSON data for the logged-in User
 * @apiSuccess (200) {String} firstName first name of the User
 * @apiSuccess (200) {String} lastName last name of the User
 * @apiSuccess (200) {String} email email of the User
 * @apiSuccess (200) {String} roleId PK of the `EaasiUserRole` for the User
 * @apiSuccess (200) {Date} lastLogin the last time the user logged in
 * @apiSuccess (200) {int} iat the time at which the JWT token for the user was issued (epoch)
 * @apiSuccess (200) {int} exp the time at which the JWT token for the user expires (epoch)
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "createdAt":"2019-10-18T14:31:16.113Z",
 *    "updatedAt":"2019-10-18T14:31:16.113Z",
 *    "id":2,
 *    "username":"wesdoyle",
 *    "firstName":"Wes",
 *    "lastName":"Doyle",
 *    "email":"wes@portalmedia.com",
 *    "roleId":1,
 *    "lastLogin":null,
 *    "iat":1571410022,
 *    "exp":1571496422
 *    }
 */
router.get('/user', jwtAuth, (req, res) => controller.user(req, res));

/**
 * @api {delete} auth/logout Log a User out
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission Logged in User only
 */
router.delete('/logout', jwtAuth, controller.logout);

/**
 * @api {post} auth/refresh Refresh Auth Token
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiPermission
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
