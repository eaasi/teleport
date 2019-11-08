import express from 'express';
import ResourceController from '@/controllers/ResourceController';

const router = express.Router();
const controller = new ResourceController();

/**
 * @api {get} resource/search Search All Resources
 * @apiVersion 1.0.0
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Returns a list a list search results
 */
router.post('/search', (req, res) => controller.search(req, res));

/**
 * @api {get} resource/environment Search All Environment Resources
 * @apiVersion 1.0.0
 * @apiName Resource Environment List
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/environment', (req, res) => controller.getEnvironment(req, res));

/**
 * @api {get} resource/software Search All Software Resources
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/software', (req, res) => controller.getSoftwarePackageDescription(req, res));

/**
 * @api {post} resource/search Search Request
 * @apiVersion 1.0.0
 * @apiName Search Resources
 * @apiGroup Resources
 * @apiDescription Searches all resources
 */
router.post('/search', (req, res) => controller.search(req, res));

/**
 * @api {post} resource/software Save to local Node
 * @apiVersion 1.0.0
 * @apiName Save Resource to Node
 * @apiGroup Resources
 * @apiDescription Saves a resource to the local Node
 */
router.post('/save', (req, res) => controller.saveEnvironment(req, res));

/**
 * @api {post} resource/ Delete a resource
 * @apiVersion 1.0.0
 * @apiName Deletes a Resource from local Node
 * @apiGroup Resources
 * @apiDescription Deletes a resource from the local Node
 */
router.delete('/', (req, res) => controller.deleteEnvironment(req, res));

module.exports = router;
