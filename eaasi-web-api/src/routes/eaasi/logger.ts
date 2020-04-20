import ApplicationLogController from '@/controllers/ApplicationLogController';
import express from 'express';

const router = express.Router();
const controller = new ApplicationLogController();

/**
 * @api {get} eaasi-task/get-state Get State of Eaasi Task
 * @apiVersion 1.0.0
 * @apiName Eaasi Task
 * @apiGroup Tasks
 * @apiPermission System Administrator only
 * 
 * @apiParam {taskId} taskId
 * 
 * @apiDescription Gets the state of a current long-running task (e.g. emulator import)
 */
router.get('/get-all', (req, res) => controller.getAll(req, res));

router.get('/get-all-from-file', (req, res) => controller.getAllFromFile(req, res));

module.exports = router;