import express from 'express';
import TaskController from '@/controllers/TaskController';

const router = express.Router();
const controller = new TaskController();

/**
 * @api {get} task/get-state Get State of a Task
 * @apiVersion 1.0.0
 * @apiName Task State
 * @apiGroup Tasks
 * @apiPermission System Administrator only
 */
router.get('/get-state', (req, res) => controller.getEmilTaskState(req, res));

module.exports = router;
