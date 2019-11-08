import express, { Request, Response } from 'express';
import EaasiBookmarkController from '@/controllers/rest-api/EaasiBookmarkController.ts';

const router = express.Router();

const controller = new EaasiBookmarkController();

/**
 * @api {get} api/bookmark:userID Request All User Bookmarks
 * @apiVersion 1.0.0
 * @apiName Get All User Bookmarks
 * @apiGroup Bookmark
 * @apiPermission Any
 * 
 * @apiParam {Number} userID User PK identifier
 * @apiSampleRequest http://localhost:8081/api/bookmark?userID=282
 * 
 * @apiSuccess (200) {[]Bookmark} result Array of Bookmark objects
 */
router.get('/', (req, res) => controller.getByUserID(req, res))

/**
 * @api {post} api/bookmark Create a new Bookmark
 * @apiVersion 1.0.0
 * @apiName Create a Bookmark
 * @apiGroup Bookmark
 * @apiPermission Any
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *          resourceID: "some_resource_id"
 *          userID: 282
 *     }
 * 
 * @apiSuccess (201) {Bookmark} result Bookmark objects
 */
router.post('/', (req, res) => controller.create(req, res))

/**
 * @api {get} api/bookmark:id Delete a Bookmark
 * @apiVersion 1.0.0
 * @apiName Delete a Bookmark
 * @apiGroup Bookmark
 * @apiPermission Any
 * 
 * @apiParam {Number} id Bookmark PK identifier
 * @apiSampleRequest http://localhost:8081/api/bookmark?id=282
 * 
 * @apiSuccess (200) {CrudServiceResult} result CrudServiceResult object
 * @apiSuccessExample {json<CrudServiceResult>} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          error: null
 *          hasError: false
 *          result: 1
 *     }
 */
router.delete('/', (req, res) => controller.delete(req, res))

/**
 * @api {get} api/bookmark/all:userID Delete All User Bookmarks
 * @apiVersion 1.0.0
 * @apiName Get All EaasiRoles
 * @apiGroup Bookmark
 * @apiPermission Any
 * 
 * @apiParam {Number} userID User PK identifier
 * @apiSampleRequest http://localhost:8081/api/bookmark/all?userID=282
 * 
 * @apiSuccess (200) {CrudServiceResult} result CrudServiceResult object
 * @apiSuccessExample {json<CrudServiceResult>} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          error: null
 *          hasError: false
 *          result: 3
 *     }
 */
router.delete('/all', (req, res) => controller.deleteAll(req, res))

module.exports = router;