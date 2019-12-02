import ImportController from '@/controllers/ImportController';
import express from 'express';

const router = express.Router();
const controller = new ImportController();

/**
 * @api {get} import/url Import a resource from a URL
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers an image import from a URL string
 */
router.post('/url', (req, res) => controller.importFromUrl(req, res));

/**
 * @api {get} import/importFiles Import a resource from files
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers file import
 */
router.post('/files', (req, res) => controller.importFiles(req, res));

/**
 * @api {get} import/saveEnvironment snapshot of imported environment
 * @apiVersion 1.0.0
 * @apiGroup Import Resources
 * @apiPermission System Administrator only
 * @apiDescription Triggers a snapshot for an imported Environment
 */
router.post('/saveEnvironment', (req, res) => controller.saveImportEnvironment(req, res));

module.exports = router;
