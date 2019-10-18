import express from 'express';
import AdminController from '@/controllers/AdminController';

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
 * @api {get} admin/users/roles Get all EaaSI User Roles
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Gets a list of all EaaSI User Roles
 *
 * @apiSuccess {[]Object} result Array of EaasiRole objects.
 */
router.get('/users/roles', (req, res) => controller.getRoles(req, res));

/**
 * @api {post} admin/users/save Save an EaaSI User
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Saves a new User
 */
router.post('/users/save', (req, res) => controller.saveUser(req, res));

/**
 * @api {post} admin/users/delete  Delete an EaaSI User
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiPermission System Administrator only
 * @apiDescription Deletes a User
 */
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/* Emulators
============================================*/
/**
 * @api {post} admin/get-emulators  Get all Emulators
 * @apiVersion 1.0.0
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 * @apiDescription Gets a list of all Emulators
 */
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));

/**
 * @api {post} admin/import-emulator Import an Emulator
 * @apiVersion 1.0.0
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 * @apiDescription Imports a new Emulator
 */
router.post('/import-emulator', (req, res) => controller.importEmulator(req, res));

/**
 * @api {post} admin/set-default-emulator-version Set the Default Emulator Version
 * @apiVersion 1.0.0
 * @apiGroup Emulators
 * @apiPermission System Administrator only
 * @apiDescription Sets the Default Emulator Version
 *
 */
router.post('/set-default-emulator-version', (req, res) => controller.setDefaultEmulatorVersion(req, res));

/* OAI-PMH Harvesters
============================================*/

/**
 * @api {get} admin/get-harvesters Get all Harvesters
 * @apiVersion 1.0.0
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 * @apiDescription Gets a list of all OAI-PMH Harvesters
 */
router.get('/get-harvesters', (req, res) => controller.getHarvesters(req, res));

/**
 * @api {post} admin/add-harvester Add a Harvester
 * @apiVersion 1.0.0
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 * @apiDescription Adds an OAI-PMH Harvester
 */
router.post('/add-harvester', (req, res) => controller.addHarvester(req, res));

/**
 * @api {post} admin/sync-harvester Synchronize Harvester
 * @apiVersion 1.0.0
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 * @apiDescription Synchronizes OAI-PMH Harvester
 */
router.post('/sync-harvester', (req, res) => controller.syncHarvester(req, res));

/**
 * @api {post} admin/delete-harvester Delete a Harvester
 * @apiVersion 1.0.0
 * @apiGroup OAI-PMH
 * @apiPermission System Administrator only
 * @apiDescription Deletes an OAI-PMH Harvester
 */
router.post('/delete-harvester', (req, res) => controller.deleteHarvester(req, res));

module.exports = router;
