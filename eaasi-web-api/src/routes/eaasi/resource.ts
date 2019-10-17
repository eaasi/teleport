import express from 'express';
import ResourceController from '@/controllers/ResourceController';

const router = express.Router();
const controller = new ResourceController();

router.get('/environment', (req, res) => controller.getEnvironment(req, res));
router.get('/software', (req, res) => controller.getSoftwarePackageDescription(req, res));
router.post('/search', (req, res) => controller.search(req, res));
router.post('/save', (req, res) => controller.saveEnvironment(req, res));

module.exports = router;
