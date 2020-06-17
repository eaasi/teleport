import express from 'express';
import { check, validationResult } from 'express-validator';

let router = express.Router();

const EmulationProjectController = require('@/controllers/rest-api/EmulationProjectController');
const controller = new EmulationProjectController();

/**
 * @api {get} emulation-project/:id Request EmulationProject by ID
 * @apiVersion 1.0.0
 * @apiName Get an EmulationProject
 * @apiGroup EmulationProject
 * @apiPermission System Administrator or Project Owner
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSuccess {Number} id Primary Key of the EmulationProject.
 * @apiSuccess {Date} createdAt Timestamp of the time the EmulationProject resource was created.
 * @apiSuccess {Date} updatedAt Timestamp of the latest time the EmulationProject resource was updated.
 * @apiSuccess {String} username The username of the EmulationProject
 * @apiSuccess {Number} roleId The number corresponding to the EaasiRole ID of the EmulationProject
 * @apiSuccess {Date} lastLogin Timestamp of the last login of the EmulationProject
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
 * @api {post} emulation-project/
 * @apiVersion 1.0.0
 * @apiName Create an EmulationProject
 * @apiGroup EmulationProject
 * @apiPermission System Administrator or Project Owner
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "Jane_86"
 *          "firstName": "Jane"
 *          "roleId": 1
 *     }
 *
 * @apiSuccess (201 Success Response) {Number} id Primary Key of the EmulationProject.
 * @apiSuccess (201 Success Response) {String} userName The name of the EmulationProject
 * @apiSuccess (201 Success Response) {Date} createdAt Timestamp of the time the EmulationProject resource was created.
 * @apiSuccess (201 Success Response) {Date} updatedAt Timestamp of the latest time the EmulationProject resource was updated.
 */
router.post('/',
	(req: Express.Request, res: Express.Response) => {
		return controller.create(req, res);
	});

/**
 * @api {put} emulation-project/:id Update an EmulationProject resource by ID
 * @apiVersion 1.0.0
 * @apiName Update an EmulationProject
 * @apiGroup EmulationProject
 * @apiPermission System Administrator or Project Owner
 *
 * @apiParam {Number} id EmulationProject PK.
 *
 * @apiSampleRequest http://localhost:8081/api/emulation-project/1
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
 * @apiSuccess (200 Success Response) {Number} id Primary Key of the EmulationProject.
 * @apiSuccess (200 Success Response) {String} userName The name of the EmulationProject
 * @apiSuccess (200 Success Response) {Date} createdAt Timestamp of the time the EmulationProject resource was created.
 * @apiSuccess (200 Success Response) {Date} updatedAt Timestamp of the latest time the EmulationProject resource was updated.
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
 * @api {delete} emulation-project/:id Delete an EmulationProject resource by ID
 * @apiVersion 1.0.0
 * @apiName Delete an EmulationProject
 * @apiGroup EmulationProject
 * @apiPermission System Administrator or Project Owner
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/emulation-project/1
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
