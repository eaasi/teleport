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
 * @apiSampleRequest http://localhost:8081/api/eaasi-user/?limit=10&page=1
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
 */
router.get('/users/list', (req, res) => controller.getUsers(req, res));
router.get('/users/roles', (req, res) => controller.getRoles(req, res));
router.post('/users/save', (req, res) => controller.saveUser(req, res));
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/* Emulaters
============================================*/
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));
router.post('/import-emulator', (req, res) => controller.importEmulator(req, res));
router.post('/set-default-emulator-version', (req, res) => controller.setDefaultEmulatorVersion(req, res));

/* OAI-PMH HArvesters
============================================*/

router.get('/get-harvesters', (req, res) => controller.getHarvesters(req, res));
router.post('/add-harvester', (req, res) => controller.addHarvester(req, res));
router.post('/sync-harvester', (req, res) => controller.syncHarvester(req, res));
router.post('/delete-harvester', (req, res) => controller.deleteHarvester(req, res));

module.exports = router;
