import BlogFeedController from '@/controllers/BlogFeedController';
import express from 'express';

const router = express.Router();
const controller = new BlogFeedController();

/**
 * @api {get} blog/feed Get EaaSI Blog Feed
 * @apiVersion 1.0.0
 * @apiGroup Blog
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 */
router.get('/feed', (req, res) => controller.getFeed(req, res));

module.exports = router;
