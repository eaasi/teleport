import express from 'express';
import { check, validationResult } from 'express-validator';

let router = express.Router();

const EmulationProjectResourceController = require('@/controllers/rest-api/EmulationProjectResourceController');
const controller = new EmulationProjectResourceController();

/**
 * @api {get} emulation-project-resource/:id Request EmulationProjectResource by ID
 * @apiVersion 1.0.0
 * @apiName Get an EmulationProjectResource
 * @apiGroup EmulationProjectResource
 * @apiPermission System Administrator or Resource Owner
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSuccess {Number} id Primary Key of the EmulationProjectResource.
 * @apiSuccess {Date} createdAt Timestamp of the time the EmulationProjectResource resource was created.
 * @apiSuccess {Date} updatedAt Timestamp of the latest time the EmulationProjectResource resource was updated.
 * @apiSuccess {String} username The username of the EmulationProjectResource
 * @apiSuccess {Number} roleId The number corresponding to the EaasiRole ID of the EmulationProjectResource
 * @apiSuccess {Date} lastLogin Timestamp of the last login of the EmulationProjectResource
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
 * @api {post} emulation-project-resource/
 * @apiVersion 1.0.0
 * @apiName Create an EmulationProjectResource
 * @apiGroup EmulationProjectResource
 * @apiPermission System Administrator or Resource Owner
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "username": "Jane_86"
 *          "firstName": "Jane"
 *          "roleId": 1
 *     }
 *
 * @apiSuccess (201 Success Response) {Number} id Primary Key of the EmulationProjectResource.
 * @apiSuccess (201 Success Response) {String} userName The name of the EmulationProjectResource
 * @apiSuccess (201 Success Response) {Date} createdAt Timestamp of the time the EmulationProjectResource resource was created.
 * @apiSuccess (201 Success Response) {Date} updatedAt Timestamp of the latest time the EmulationProjectResource resource was updated.
 */
router.post('/',
	(req: Express.Request, res: Express.Response) => {
		return controller.create(req, res);
	});

/**
 * @api {put} emulation-project-resource/:id Update an EmulationProjectResource resource by ID
 * @apiVersion 1.0.0
 * @apiName Update an EmulationProjectResource
 * @apiGroup EmulationProjectResource
 * @apiPermission System Administrator or Resource Owner
 *
 * @apiParam {Number} id EmulationProjectResource PK.
 *
 * @apiSampleRequest http://localhost:8081/api/emulation-project-resource/1
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
 * @apiSuccess (200 Success Response) {Number} id Primary Key of the EmulationProjectResource.
 * @apiSuccess (200 Success Response) {String} userName The name of the EmulationProjectResource
 * @apiSuccess (200 Success Response) {Date} createdAt Timestamp of the time the EmulationProjectResource resource was created.
 * @apiSuccess (200 Success Response) {Date} updatedAt Timestamp of the latest time the EmulationProjectResource resource was updated.
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
 * @api {delete} emulation-project-resource/:id Delete an EmulationProjectResource resource by ID
 * @apiVersion 1.0.0
 * @apiName Delete an EmulationProjectResource
 * @apiGroup EmulationProjectResource
 * @apiPermission System Administrator or Resource Owner
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/emulation-project-resource/1
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
