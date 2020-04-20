import ImportController from '@/controllers/ImportController';
import UserImportController from '@/controllers/rest-api/UserImportController';
import express from 'express';

const router = express.Router();
const importController = new ImportController();
const userImportController = new UserImportController();

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
router.post('/createEnvironment', (req, res) => importController.createEnvironment(req, res));

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

/**
 * @api {get} import/user-import-relation creates a record for user imported resource
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission All Users
 */
router.post('/user-import-relation', (req, res) => userImportController.createUserImportRelation(req, res));

/**
 * @api {get} import/user-imported-resource fetches user imported resources
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission All Users
 */
router.get('/user-imported-resource', (req, res) => userImportController.getByUserID(req, res));

module.exports = router;
