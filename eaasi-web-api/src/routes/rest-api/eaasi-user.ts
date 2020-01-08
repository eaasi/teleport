import express from 'express';
import { check, validationResult } from 'express-validator';

let router = express.Router();

const EaasiUserController = require('@/controllers/rest-api/EaasiUserController');
const controller = new EaasiUserController();

/**
 * @api {get} eaasi-user/:id Request All EaasiUsers (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiUsers
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-user/?limit=10&page=1
 *
 * @apiSuccess {[]Object} result Array of EaasiUser objects.
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
 * @api {get} eaasi-user/:id Request EaasiUser by ID
 * @apiVersion 1.0.0
 * @apiName Get an EaasiUser
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSuccess {Number} id Primary Key of the EaasiUser.
 * @apiSuccess {Date} createdAt Timestamp of the time the EaasiUser resource was created.
 * @apiSuccess {Date} updatedAt Timestamp of the latest time the EaasiUser resource was updated.
 * @apiSuccess {String} username The username of the EaasiUser
 * @apiSuccess {Number} roleId The number corresponding to the EaasiRole ID of the EaasiUser
 * @apiSuccess {Date} lastLogin Timestamp of the last login of the EaasiUser
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
 * @api {post} eaasi-user/
 * @apiVersion 1.0.0
 * @apiName Create an EaasiUser
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "Jane_86"
 *          "firstName": "Jane"
 *          "roleId": 1
 *     }
 *
 * @apiSuccess (201 Success Response) {Number} id Primary Key of the EaasiUser.
 * @apiSuccess (201 Success Response) {String} userName The name of the EaasiUser
 * @apiSuccess (201 Success Response) {Date} createdAt Timestamp of the time the EaasiUser resource was created.
 * @apiSuccess (201 Success Response) {Date} updatedAt Timestamp of the latest time the EaasiUser resource was updated.
 */
router.post('/',
	(req: Express.Request, res: Express.Response) => {
		return controller.create(req, res);
	});

/**
 * @api {put} eaasi-user/:id Update an EaasiUser resource by ID
 * @apiVersion 1.0.0
 * @apiName Update an EaasiUser
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiParam {Number} id EaasiUser PK.
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-user/1
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
 * @apiSuccess (200 Success Response) {Number} id Primary Key of the EaasiUser.
 * @apiSuccess (200 Success Response) {String} userName The name of the EaasiUser
 * @apiSuccess (200 Success Response) {Date} createdAt Timestamp of the time the EaasiUser resource was created.
 * @apiSuccess (200 Success Response) {Date} updatedAt Timestamp of the latest time the EaasiUser resource was updated.
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
 * @api {delete} eaasi-user/:id Delete an EaasiUser resource by ID
 * @apiVersion 1.0.0
 * @apiName Delete an EaasiUser
 * @apiGroup EaasiUser
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-user/1
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
