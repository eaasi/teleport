import ImportController from '@/controllers/ImportController';
import { IAuthorizedPostRequest } from '@/types/auth/Auth';
import { ICreateEnvironmentPayload } from '@/types/emil/Emil';
import express from 'express';

const router = express.Router();
const importController = new ImportController();

/**
 * @api {get} import/url Import a resource from a URL
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers an image import from a URL string
 */
router.post('/url', (req, res) => importController.importFromUrl(req, res));

/**
 * @api {get} import/importFiles Import a resource from files
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers file import
 */
router.post('/files', (req, res) => importController.importFiles(req, res));

/**
 * @api {get} import/createEnvironment create environment
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers a createEnvironment event
 */
router.post('/createEnvironment', (req: IAuthorizedPostRequest<ICreateEnvironmentPayload>, res) => importController.createEnvironment(req, res));

/**
 * @api {get} import/import-image import image
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers a importImage
 */
router.post('/import-image', (req, res) => importController.importImage(req, res));

/**
 * @api {get} import/saveEnvironment snapshot of imported environment
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers a snapshot for an imported Environment
 */
router.post('/saveEnvironment', (req, res) => importController.saveImportEnvironment(req, res));

/**
 * @api {get} import/postComponents posts to a components endpoint
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers a post to components
 */
router.post('/postComponents', (req, res) => importController.postComponents(req, res));

module.exports = router;
