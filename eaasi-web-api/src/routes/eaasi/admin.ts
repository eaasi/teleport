import express from 'express';
import AdminController from '@/controllers/AdminController';

const router = express.Router();
const controller = new AdminController();

/* Users
============================================*/
/**
 * @api {get} api/admin/users/list
 * @apiVersion 1.0.0
 * @apiName Get All Users
 * @apiGroup Users
 * @apiPermission System Administrator only
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/users/list', (req, res) => controller.getUsers(req, res));

/**
 * @api {get} api/admin/users/roles
 * @apiVersion 1.0.0
 * @apiName Get All User Roles
 * @apiGroup Users
 * @apiPermission System Administrator only
 *
 * @apiSuccess {[]Object} result Array of EaasiRole objects.
 */
router.get('/users/roles', (req, res) => controller.getRoles(req, res));

/**
 * @api {post} api/admin/users/save
 * @apiVersion 1.0.0
 * @apiName Save a User
 * @apiGroup Users
 * @apiPermission System Administrator only
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/users/save', (req, res) => controller.saveUser(req, res));

/**
 * @api {post} api/admin/users/delete
 * @apiVersion 1.0.0
 * @apiName Delete a User
 * @apiGroup Users
 * @apiPermission System Administrator only
 *
 */
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/* Emulators
============================================*/
/**
 * @api {post} api/admin/get-emulators
 * @apiVersion 1.0.0
 * @apiName Get All Emulators
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 *
 */
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));

/**
 * @api {post} api/admin/import-emulator
 * @apiVersion 1.0.0
 * @apiName Import Emulator
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 *
 */
router.post('/import-emulator', (req, res) => controller.importEmulator(req, res));

/**
 * @api {post} api/admin/set-default-emulator-version
 * @apiVersion 1.0.0
 * @apiName Sets Emulator Version
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 *
 */
router.post('/set-default-emulator-version', (req, res) => controller.setDefaultEmulatorVersion(req, res));

/* OAI-PMH Harvesters
============================================*/

/**
 * @api {get} api/admin/get-harvesters
 * @apiVersion 1.0.0
 * @apiName Get all OAI-PMH Harvesters
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 *
 */
router.get('/get-harvesters', (req, res) => controller.getHarvesters(req, res));

/**
 * @api {post} api/admin/add-harvester
 * @apiVersion 1.0.0
 * @apiName Add OAI-PMH Harvester
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 *
 */
router.post('/add-harvester', (req, res) => controller.addHarvester(req, res));

/**
 * @api {post} api/admin/sync-harvester
 * @apiVersion 1.0.0
 * @apiName Sync OAI-PMH Harvester
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 *
 */
router.post('/sync-harvester', (req, res) => controller.syncHarvester(req, res));

/**
 * @api {post} api/admin/delete-harvester
 * @apiVersion 1.0.0
 * @apiName Delete OAI-PMH Harvester
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 *
 */
router.post('/delete-harvester', (req, res) => controller.deleteHarvester(req, res));

module.exports = router;
