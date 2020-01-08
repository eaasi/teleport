import EaasiTaskController from '@/controllers/rest-api/EaasiTaskController';
import express from 'express';

const router = express.Router();
const controller = new EaasiTaskController();

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
router.get('/get-state/:taskId', (req, res) => controller.getState(req, res));

/**
 * @api {get} eaasi-task/ Get All Eaasi Tasks
 * @apiVersion 1.0.0
 * @apiName Eaasi Task
 * @apiGroup Tasks
 * @apiPermission System Administrator only
 * @apiDescription Gets all eaasi tasks
 */
router.get('/', (req, res) => controller.getAll(req, res));

/**
 * @api {post} eaasi-task/ Updates descriptio of Eaasi Task
 * @apiVersion 1.0.0
 * @apiName Eaasi Task
 * @apiGroup Tasks
 * 
 * @apiBody {object} {
 *	 id: number;
 *	 description?: string;
 * }
 * 
 * @apiPermission System Administrator only
 * @apiDescription Updates description of eaasi task
 */
router.post('/', (req, res) => controller.updateTaskDescription(req, res));

/**
 * @api {delete} eaasi-task/:id Delete an EaasiTask by PK ID
 * @apiVersion 1.0.0
 * @apiName Delete an Eaasi Task
 * @apiGroup Eaasi Task
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-task/1
 *
 * @apiSuccess (200 Success Response) {Object} Result Object containing the PK of the deleted resource.
 */
router.delete('/:id', (req, res) => controller.deleteTask(req, res));

module.exports = router;
