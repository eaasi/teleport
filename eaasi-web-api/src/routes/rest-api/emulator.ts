import {check, validationResult} from 'express-validator';
import express from 'express';

let router = express.Router();

const EmulatorController = require('../controllers/EmulatorController');
const controller = new EmulatorController();

/**
 * @api {get} api/emulator:id Request All Emulators (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All Emulators
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/emulator?limit=25&page=1
 *
 * @apiSuccess {[]Object} result Array of Emulator objects.
 */
router.get('/',
	[check('limit').optional().isNumeric()],
	[check('page').optional().isNumeric()],
	(req: Express.Request, res: Express.Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.getAll(req, res);
	});

/**
 * @api {get} api/emulator:id Request Emulator by ID
 * @apiVersion 1.0.0
 * @apiName Get an Emulator
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSuccess {Number} id Primary Key of the Emulator.
 * @apiSuccess {Date} createdAt Timestamp of the time the Emulator resource was created.
 * @apiSuccess {Date} updatedAt Timestamp of the latest time the Emulator resource was updated.
 * @apiSuccess {String} username The username of the Emulator
 * @apiSuccess {Number} roleId The number corresponding to the EaasiRole ID of the Emulator
 * @apiSuccess {Date} lastLogin Timestamp of the last login of the Emulator
 */
router.get('/:id',
	[check('id').isNumeric()],
	(req: Express.Request, res: Express.Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.get(req, res);
	});

/**
 * @api {post} api/emulator Create a new Emulator resource
 * @apiVersion 1.0.0
 * @apiName Create an Emulator
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "Jane_86"
 *          "firstName": "Jane"
 *          "roleId": 1
 *     }
 *
 * @apiSuccess (201 Success Response) {Number} id Primary Key of the Emulator.
 * @apiSuccess (201 Success Response) {String} userName The name of the Emulator
 * @apiSuccess (201 Success Response) {Date} createdAt Timestamp of the time the Emulator resource was created.
 * @apiSuccess (201 Success Response) {Date} updatedAt Timestamp of the latest time the Emulator resource was updated.
 */
router.post('/',
	(req: Express.Request, res: Express.Response) => {
		return controller.create(req, res);
	});

/**
 * @api {put} api/emulator:id Update an Emulator resource by ID
 * @apiVersion 1.0.0
 * @apiName Update an Emulator
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiParam {Number} id Emulator PK.
 *
 * @apiSampleRequest http://localhost:8081/api/emulator/1
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "Custom User"
 *          "firstName": "Jane"
 *          "roleId": 1
 *     }
 *
 * @apiSuccess (200 Success Response) {Number} id Primary Key of the Emulator.
 * @apiSuccess (200 Success Response) {String} userName The name of the Emulator
 * @apiSuccess (200 Success Response) {Date} createdAt Timestamp of the time the Emulator resource was created.
 * @apiSuccess (200 Success Response) {Date} updatedAt Timestamp of the latest time the Emulator resource was updated.
 */
router.put('/:id',
	[check('id').isNumeric()],
	(req: Express.Request, res: Express.Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.update(req, res);
	});

/**
 * @api {delete} api/emulator:id Delete an Emulator resource by ID
 * @apiVersion 1.0.0
 * @apiName Delete an Emulator
 * @apiGroup Emulator
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/emulator/1
 *
 * @apiSuccess (200 Success Response) {Object} Result Object containing the PK of the deleted resource.
 */
router.delete('/:id',
	[check('id').isNumeric()],
	(req: Express.Request, res: Express.Response) => {
		const errors = validationResult(req);
		return !errors.isEmpty()
			? controller.sendMalformedRequestResponse(req, res, errors)
			: controller.delete(req, res);
	});

module.exports = router;