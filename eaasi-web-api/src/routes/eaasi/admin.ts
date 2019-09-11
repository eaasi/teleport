import express from 'express';
import AdminController from '@/controllers/AdminController';

const router = express.Router();
const controller = new AdminController();

router.get('/get-users', (req, res) => controller.getUsers(req, res));
router.get('/get-user-roles', (req, res) => controller.getRoles(req, res));
router.get('/get-emulators', (req, res) => controller.getEmulators(req, res));

module.exports = router;
