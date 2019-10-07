import BlogFeedController from '@/controllers/BlogFeedController';
import express from 'express';

const router = express.Router();
const controller = new BlogFeedController();

router.get('/feed', (req, res) => controller.getFeed(req, res));

module.exports = router;
