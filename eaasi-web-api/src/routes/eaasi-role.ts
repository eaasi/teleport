import express from "express";
import {check, validationResult} from "express-validator";

const router = express.Router();

const EaasiRoleController = require('../controllers/EaasiRoleController');
const controller = new EaasiRoleController();


/**
 * @api {get} api/eaasi-role/:id Request All EaasiRoles (Paginated)
 * @apiVersion 1.0.0
 * @apiName Get All EaasiRoles
 * @apiGroup EaasiRole
 * @apiPermission System Administrator only
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-role/?limit=10&page=1
 *
 * @apiSuccess {[]Object} result Array of EaasiRole objects.
 */
router.get('/',
    [check('limit').optional().isNumeric()],
    [check('page').optional().isNumeric()],
    (req: Express.Request, res: Express.Response) => {
		throw new Error("UGH!");
        const errors = validationResult(req);
        return !errors.isEmpty()
            ? controller.sendMalformedRequestResponse(req, res, errors)
            : controller.getAll(req, res)
    });

/**
 * @api {get} api/eaasi-role/:id Request EaasiRole by ID
 * @apiVersion 1.0.0
 * @apiName Get an EaasiRole
 * @apiGroup EaasiRole
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSuccess {Number} id Primary Key of the EaasiRole.
 * @apiSuccess {Date} createdAt Timestamp of the time the EaasiRole resource was created.
 * @apiSuccess {Date} updatedAt Timestamp of the latest time the EaasiRole resource was updated.
 * @apiSuccess {String} roleName The name of the EaasiRole
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
 * @api {post} api/eaasi-role/ Create a new EaasiRole resource
 * @apiVersion 1.0.0
 * @apiName Create an EaasiRole
 * @apiGroup EaasiRole
 * @apiPermission System Administrator only
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "roleName": "Administrator"
 *     }
 *
 * @apiSuccess (201 Success Response) {Number} id Primary Key of the EaasiRole.
 * @apiSuccess (201 Success Response) {String} roleName The name of the EaasiRole
 * @apiSuccess (201 Success Response) {Date} createdAt Timestamp of the time the EaasiRole resource was created.
 * @apiSuccess (201 Success Response) {Date} updatedAt Timestamp of the latest time the EaasiRole resource was updated.
 */
router.post('/',
    (req: Express.Request, res: Express.Response) => {
        return controller.create(req, res)
    });

/**
 * @api {put} api/eaasi-role/:id Update an EaasiRole resource by ID
 * @apiVersion 1.0.0
 * @apiName Update an EaasiRole
 * @apiGroup EaasiRole
 * @apiPermission System Administrator only
 *
 * @apiParam {Number} id EaasiRole PK.
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-role/1
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          "roleName": "Custom Role"
 *     }
 *
 * @apiSuccess (200 Success Response) {Number} id Primary Key of the EaasiRole.
 * @apiSuccess (200 Success Response) {String} roleName The name of the EaasiRole
 * @apiSuccess (200 Success Response) {Date} createdAt Timestamp of the time the EaasiRole resource was created.
 * @apiSuccess (200 Success Response) {Date} updatedAt Timestamp of the latest time the EaasiRole resource was updated.
 */
router.put('/:id',
    [check('id').isNumeric()],
    (req: Express.Request, res: Express.Response) => {
        const errors = validationResult(req);
        return !errors.isEmpty()
            ? controller.sendMalformedRequestResponse(req, res, errors)
            : controller.update(req, res)
    });

/**
 * @api {delete} api/eaasi-role/:id Delete an EaasiRole resource by ID
 * @apiVersion 1.0.0
 * @apiName Delete an EaasiRole
 * @apiGroup EaasiRole
 * @apiPermission System Administrator only
 *
 * @apiParam {Number}  id PK identifier
 *
 * @apiSampleRequest http://localhost:8081/api/eaasi-role/1
 *
 * @apiSuccess (200 Success Response) {Object} Result Object containing the PK of the deleted resource.
 */
router.delete('/:id',
    [check('id').isNumeric()],
    (req: Express.Request, res: Express.Response) => {
        const errors = validationResult(req);
        return !errors.isEmpty()
            ? controller.sendMalformedRequestResponse(req, res, errors)
            : controller.delete(req, res)
    });

module.exports = router;
