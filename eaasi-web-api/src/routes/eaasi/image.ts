import ImageController from '@/controllers/ImageController';
import express from 'express';

const router = express.Router();
const controller = new ImageController();

/**
 * @api {get} image/importFromUrl Import an Image from a URL
 * @apiVersion 1.0.0
 * @apiGroup Image Import
 * @apiPermission System Administrator only
 * @apiDescription Triggers an image import from a URL string
 */
router.post('/importFromUrl', (req, res) => controller.importImageFromUrl(req, res));

module.exports = router;
