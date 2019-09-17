import express from 'express';
import TaskController from '@/controllers/TaskController';

const router = express.Router();
const controller = new TaskController();

router.get('/get-state', (req, res) => controller.getEmilTaskState(req, res));

module.exports = router;