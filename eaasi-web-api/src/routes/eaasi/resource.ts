import express from 'express';
import ResourceController from '@/controllers/ResourceController';

const router = express.Router();
const controller = new ResourceController();

router.post('/search', (req, res) => controller.search(req, res));

module.exports = router;