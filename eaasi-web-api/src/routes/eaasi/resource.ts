import express from 'express';
import ResourceController from '@/controllers/ResourceController';

const router = express.Router();
const controller = new ResourceController();

/**
 * @api {get} resource/search
 * @apiVersion 1.0.0
 * @apiName Resource Search
 * @apiGroup Resource
 * @apiPermission System Administrator only
 * @apiDescription Returns a list a list search results
 */
router.post('/search', (req, res) => controller.search(req, res));

/**
 * @api {get} resource/environment
 * @apiVersion 1.0.0
 * @apiName Resource Environment List
 * @apiGroup Resource
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/environment', (req, res) => controller.getEnvironment(req, res));

/**
 * @api {get} resource/software
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resource
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/software', (req, res) => controller.getSoftwarePackageDescription(req, res));

module.exports = router;
