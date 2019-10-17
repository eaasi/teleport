import express from 'express';
import AdminController from '@/controllers/AdminController';

const router = express.Router();
const controller = new AdminController();

/* Users
============================================*/
/**
 * @api {get} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiUsers
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/users/list', (req, res) => controller.getUsers(req, res));

/**
 * @api {get} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiUsers
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/users/roles', (req, res) => controller.getRoles(req, res));

/**
 * @api {post} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiUsers
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/users/save', (req, res) => controller.saveUser(req, res));

/**
 * @api {post} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiUsers
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/* Emulators
============================================*/
/**
 * @api {post} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All Emulators
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));

/**
 * @api {post} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Import Emulator
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/import-emulator', (req, res) => controller.importEmulator(req, res));

/**
 * @api {post} api/admin/users/list Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Sets Emulator Version
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/admin/users/list
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.post('/set-default-emulator-version', (req, res) => controller.setDefaultEmulatorVersion(req, res));

/* OAI-PMH Harvesters
============================================*/

router.get('/get-harvesters', (req, res) => controller.getHarvesters(req, res));
router.post('/add-harvester', (req, res) => controller.addHarvester(req, res));
router.post('/sync-harvester', (req, res) => controller.syncHarvester(req, res));
router.post('/delete-harvester', (req, res) => controller.deleteHarvester(req, res));

module.exports = router;
