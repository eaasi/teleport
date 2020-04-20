import ApplicationLogController from '@/controllers/ApplicationLogController';
import express from 'express';

const router = express.Router();
const controller = new ApplicationLogController();

/**
 * @api {get} eaasi-task/get-all Get All App Logs from database
 * @apiVersion 1.0.0
 * @apiName Application Logs
 * @apiGroup Application Logs
 * @apiPermission Any User
 * 
 * @apiParam {taskId} taskId
 * 
 * @apiDescription Gets full application log from database
 */
router.get('/get-all', (req, res) => controller.getAll(req, res));

/**
 * @api {get} eaasi-task/get-all-from-file Get All App Logs from log files
 * @apiVersion 1.0.0
 * @apiName Application Logs
 * @apiGroup Application Logs
 * @apiPermission System Administrator only
 * 
 * @apiParam {taskId} taskId
 * 
 * @apiDescription Gets full application log from log files
 */
router.get('/get-all-from-file', (req, res) => controller.getAllFromFile(req, res));

module.exports = router;