import express from 'express';

let router = express.Router();

const ImportedResourceController = require('@/controllers/rest-api/UserImportController');

const controller = new UserImportController();

/**
 * @api {get} api/imported-resource:userID Request All User Imported Resources
 * @apiVersion 1.0.0
 * @apiName Get All User Imported Resources
 * @apiGroup Imported Resource
 * @apiPermission Any
 *
 * @apiParam {Number} userID User PK identifier
 * @apiSampleRequest http://localhost:8081/api/imported-resource?userID=282
 */
router.get('/', (req, res) => controller.getByUserID(req, res));

/**
 * @api {post} api/imported-resource Create a new Imported Resource
 * @apiVersion 1.0.0
 * @apiName Create an Imported Resource
 * @apiGroup Imported Resource
 * @apiPermission Any
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *          resourceId: "some_resource_id"
 *          userID: 282
 *     }
 */
router.post('/', (req, res) => controller.create(req, res));

module.exports = router;
