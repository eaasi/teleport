import express from 'express';
import AdminController from '@/controllers/AdminController';

const router = express.Router();
const controller = new AdminController();

/* Users
============================================*/
router.get('/users/list', (req, res) => controller.getUsers(req, res));
router.get('/users/roles', (req, res) => controller.getRoles(req, res));
router.post('/users/save', (req, res) => controller.saveUser(req, res));
router.post('/users/delete', (req, res) => controller.deleteUser(req, res));

/* Emulaters
============================================*/
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));
router.post('/import-emulator', (req, res) => controller.importEmulator(req, res));
router.post('/set-default-emulator-version', (req, res) => controller.setDefaultEmulatorVersion(req, res));

module.exports = router;
