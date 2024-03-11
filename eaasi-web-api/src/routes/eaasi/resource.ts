import ResourceController, { IAuthorizedGetContentRequest } from '@/controllers/ResourceController';
import { IAuthorizedDeleteRequest, IAuthorizedGetRequest, IAuthorizedPostRequest, IAuthorizedRequest } from '@/types/auth/Auth';
import { IEmulatorComponentRequest } from '@/types/resource/Resource';
import express, {Request, Response} from 'express';

const router = express.Router();
const controller = new ResourceController();

/**
 * @api {get} resource/search Search All Resources
 * @apiVersion 1.0.0
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Returns a list a list search results
 */
router.post('/search', (req: IAuthorizedRequest, res) => controller.search(req, res));

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
 * @api {get} resource/templates get all environment templates
 * @apiVersion 1.0.0
 * @apiName Environment Templates
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets an object containing data about all environment templates
 */
router.get('/templates', (req, res) => controller.getTemplates(req, res));

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

router.delete('/delete-software-object', (req: Request, res) => controller.deleteSoftwareObject(req, res));

/**
 * @api {post} replicates an image
 * @apiVersion 1.0.0
 * @apiName Environment Replicate
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Replicates a list of images to the requested archive
 */
router.post('/replicate-environment', (req, res) => controller.replicateEnvironment(req, res));

/**
 * @api {post} deletes an image
 * @apiVersion 1.0.0
 * @apiName Image Delete
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Deletes an image
 */
router.post('/delete-image', (req, res) => controller.deleteImage(req, res));

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
 * @api {get} resource/software-object Get Software Object by software id
 * @apiVersion 1.0.0
 * @apiName Software Resource Object
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets software object
 */
router.get('/software-object', (req, res) => controller.getSoftwareObject(req, res));

/**
 * @api {get} resource/software-object Get Software Object list by software ids
 * @apiVersion 1.0.0
 * @apiName Software Resource Object List
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets list of software objects by ids
 */
router.get('/software-objects', (req, res) => controller.getSoftwareObjects(req, res));

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
 * @api {get} resource/emulators Gets name Indexes
 * @apiVersion 1.0.0
 * @apiName Gets emulators
 * @apiGroup Resources
 * @apiDescription Gets emulators
 */
router.get('/emulators', (req, res) => controller.getEmulators(req, res));

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
 * @api {get} gets software package description
 * @apiVersion 1.0.0
 * @apiName Software Resource Package Description
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/objectArchive', (req, res) => controller.getObjectArchives(req, res));

/**
 * @api {get} gets content object metadata
 * @apiVersion 1.0.0
 * @apiName Content Resource Metadata
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Gets Content Object Metadata from the eaas java api
 */
router.get('/content', (req: IAuthorizedGetContentRequest, res) => controller.getContent(req, res));

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
 * @apiDescription Creates Base Environment
 */
router.post('/save-new-environment', (req, res) => controller.saveNewEnvironment(req, res));

/**
 * @api {post} Saves a new Content (or "Object") Environment
 * @apiVersion 1.0.0
 * @apiName Save new Content / Object Environment from existing Base Environment
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Creates Content / Object Environment
 */
router.post('/save-new-object-environment', (req, res) => controller.saveNewObjectEnvironment(req, res));

/**
 * @api {post} Saves a Revision of an existing Environment
 * @apiVersion 1.0.0
 * @apiName Save Environment Revision
 * @apiGroup Resources
 * @apiPermission System Administrator only
 * @apiDescription Revises existing Environment
 */
router.post('/save-environment-revision', (req, res) => controller.saveEnvironmentRevision(req, res));

/**
 * @api {post} Refresh image archive
 * @apiVersion 1.0.0
 * @apiName Synchronized Images
 * @apiGroup Resources
 * @apiDescription Refresh image archive
 */
router.post('/environment-repository/actions/sync', (req, res) => controller.syncImagesUrl(req, res));


module.exports = router;
