import express from 'express';
import ResourceController from '@/controllers/ResourceController';

const router = express.Router();
const controller = new ResourceController();

router.post('/search', (req, res) => controller.search(req, res));
router.get('/environment', (req, res) => controller.getEnvironment(req, res));
router.get('/software', (req, res) => controller.getSoftware(req, res));

module.exports = router;
