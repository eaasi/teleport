import ResourceController from '@/controllers/ResourceController';
import express from 'express';

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
 * @api {get} resource/environmentTemplates get all environment templates
 * @apiVersion 1.0.0
 * @apiName Environment Templates
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets an object containing data about all environment templates
 */
router.get('/environmentTemplates', (req, res) => controller.getEnvironmentTemplates(req, res));

/**
 * @api {post} resource/forkRevision creates a fork revision request
 * @apiVersion 1.0.0
 * @apiName Fork Revision
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Requests a fork revision that should create an environment with requested revision state
 */
router.post('/fork-revision', (req, res) => controller.forkRevision(req, res));

/**
 * @api {post} resource/software-object Saves Software Objects
 * @apiVersion 1.0.0
 * @apiName Save Software Resource Object
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Saves software object
 */
router.post('/save-software-object', (req, res) => controller.saveSoftwareObject(req, res));

/**
 * @api {post} replicates an image
 * @apiVersion 1.0.0
 * @apiName Environment Replicate
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Replicates a list of images to the requested archive
 */
router.post('/replicate-image', (req, res) => controller.replicateImage(req, res));

/**
 * @api {post} resource/software-object Saves Software Objects
 * @apiVersion 1.0.0
 * @apiName Save Software Resource Object
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Saves software object
 */
router.post('/save-software-object', (req, res) => controller.saveSoftwareObject(req, res));

/**
 * @api {get} resource/software-object Get Software Objects by software id
 * @apiVersion 1.0.0
 * @apiName Software Resource Object
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets software object
 */
router.get('/software-object', (req, res) => controller.getSoftwareObject(req, res));

/**
 * @api {get} resource/software-metadata Get Software Metadata by software id
 * @apiVersion 1.0.0
 * @apiName Software Resource Metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets software metadata
 */
router.get('/software-metadata', (req, res) => controller.getSoftwareMetadata(req, res));

/**
 * @api {post} resource/search Search Request
 * @api {get} resource/patches get all patches
 * @apiVersion 1.0.0
 * @apiName Patches
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets an object containing data about all environment templates
 */
router.get('/patches', (req, res) => controller.getPatches(req, res));

/**
 * @api {get} resource/operatingSystemMetadata Gets OS metadata
 * @apiVersion 1.0.0
 * @apiName Gets OS metadata
 * @apiGroup Resources
 * @apiDescription Gets OS metadata
 */
router.get('/operatingSystemMetadata', (req, res) => controller.getOperatingSystemMetadata(req, res));

/**
 * @api {get} resource/nameIndexes Gets name Indexes
 * @apiVersion 1.0.0
 * @apiName Gets name indexes
 * @apiGroup Resources
 * @apiDescription Gets name indexes
 */
router.get('/nameIndexes', (req, res) => controller.getNameIndexes(req, res));

/**
 * @api {post} resource/classify creates a task to detect environments that uses requested software
 * @apiVersion 1.0.0
 * @apiName Detect environments that uses requested software
 * @apiGroup Resources
 * @apiDescription Gets name indexes
 */
router.post('/classify', (req, res) => controller.classify(req, res));

/**
 * @api {post} resource/ Delete a resource
 * @apiVersion 1.0.0
 * @apiName Deletes a Resource from local Node
 * @apiGroup Resources
 * @apiDescription Deletes a resource from the local Node
 */
router.delete('/environment', (req, res) => controller.deleteEnvironment(req, res));

/**
 * @api {post} updates environment description
 * @apiVersion 1.0.0
 * @apiName Update Environment Description
 * @apiGroup Resources
 * @apiDescription Updates Environment Description
 */
router.post('/update-environment', (req, res) => controller.updateEnvironmentDetails(req, res));

/**
 * @api {get} gets software package description
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/software', (req, res) => controller.getSoftwarePackageDescription(req, res));

/**
 * @api {post} resource/software Save to local Node
 * @apiVersion 1.0.0
 * @apiName Save Resource to Node
 * @apiGroup Resources
 * @apiDescription Saves a resource to the local Node
 */
router.post('/save', (req, res) => controller.saveEnvironment(req, res));

/**
 * @api {get} gets software package description
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/objectArchive', (req, res) => controller.getObjectArchive(req, res));

/**
 * @api {get} gets software package description
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/objectArchiveData', (req, res) => controller.getObjectArchive(req, res));

/**
 * @api {get} gets content object metadata
 * @apiVersion 1.0.0
 * @apiName Content Resource Metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets Content Object Metadata from the eaas java api
 */
router.get('/content', (req, res) => controller.getContent(req, res));

/**
 * @api {post} Saves content object metadata
 * @apiVersion 1.0.0
 * @apiName Save Content Resource Metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Saves Content Object
 */
router.post('/content', (req, res) => controller.saveContent(req, res));

/**
 * @api {delete} Deletes content object metadata
 * @apiVersion 1.0.0
 * @apiName Delete Content Resource metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Deletes Content Object
 */
router.delete('/content', (req, res) => controller.deleteContent(req, res));

/**
 * @api {post} Saves a new Environment based on an existing one
 * @apiVersion 1.0.0
 * @apiName Save new Environment from Existing
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Deletes Content Object
 */
router.post('/save-new-environment', (req, res) => controller.saveNewEnvironment(req, res));

/**
 * @api {post} Saves a Revision of an existing Environment
 * @apiVersion 1.0.0
 * @apiName Save Environment Revision
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Deletes Content Object
 */
router.post('/save-environment-revision', (req, res) => controller.saveEnvironmentRevision(req, res));

module.exports = router;
