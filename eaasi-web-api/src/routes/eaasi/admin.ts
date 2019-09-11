import express from 'express';
import AdminController from '@/controllers/AdminController';

const router = express.Router();
const controller = new AdminController();

router.get('/get-users', controller.getUsers);
router.get('/get-user-roles', controller.getUsers);

module.exports = router;