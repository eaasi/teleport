import TaskController from '@/controllers/TaskController';
import express from 'express';

const router = express.Router();
const controller = new TaskController();

/**
 * @api {get} task/get-state Get State of a Container Task
 * @apiVersion 1.0.0
 * @apiName Task State
 * @apiGroup Tasks
 * @apiPermission System Administrator only
 * @apiDescription Gets the state of a current long-running container task (e.g. emulator import)
 */
router.get('/get-state', (req, res) => controller.getEmilContainerTaskState(req, res));

/**
 * @api {get} task/get-state Get State of an Environment Task
 * @apiVersion 1.0.0
 * @apiName Task State
 * @apiGroup Tasks
 * @apiPermission System Administrator only
 * @apiDescription Gets the state of a current long-running environment task (e.g. environment replication)
 */
router.get('/get-environment-state', (req, res) => controller.getEmilEnvironmentTaskState(req, res));

module.exports = router;
