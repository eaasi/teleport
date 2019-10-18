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
router.post('/search', (req, res) => controller.search(req, res));
router.post('/save', (req, res) => controller.saveEnvironment(req, res));

module.exports = router;
