import AdminController from '@/controllers/AdminController';
import { createAccountRequestLimit, resetPasswordRequestLimit } from '@/middleware/request-limit';
import express from 'express';
const router = express.Router();
const controller = new AdminController();

/* Users
============================================*/
/**
 * @api {get} admin/users/list Get all EaaSI Users
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Gets a list of all EaaSI Users
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/users/list', (req, res) => controller.getUsers(req, res));

/**
 * @api {post} admin/users/create Create an EaaSI User
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Creates a new User
 */
router.post('/users/create', createAccountRequestLimit, (req, res) => controller.createUser(req, res));

/**
 * @api {post} admin/users/update Updates an EaaSI User
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Updates an existing User
 */
router.post('/users/update', createAccountRequestLimit, (req, res) => controller.updateUser(req, res));

/**
 * @api {post} admin/users/delete  Delete an EaaSI User
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Deletes a User
 */
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/**
 * @api {post} admin/users/delete  Reset User PAssword
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Reset User Password
 */
router.post('/users/reset-password', resetPasswordRequestLimit, (req, res) => controller.resetUserPassword(req, res));

/* Emulators
============================================*/
/**
 * @api {get} admin/api-key Get provider Api Key
 * @apiVersion 1.0.0
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 * @apiDescription Gets an API key for the provider
 */
router.get('/api-key', (req, res) => controller.getApiKey(req, res));

/**
 * @api {get} /groups/:name Get group
 * @apiVersion 1.0.0
 * @apiGroup Groups
 * @apiPermission System Administrator only
 * @apiDescription Gets group info by group name
 */
router.get('/groups/:name', (req, res) => controller.getGroup(req, res))

module.exports = router;