import BlogFeedController from '@/controllers/BlogFeedController';
import express from 'express';

const router = express.Router();
const controller = new BlogFeedController();

/**
 * @api {get} blog/feed
 * @apiVersion 1.0.0
 * @apiName Blog RSS Feed (JSON)
 * @apiGroup Blog
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 *
 * @apiSuccess {[]Object} Logs a user in and redirects a user to the homepage.
 */
router.get('/feed', (req, res) => controller.getFeed(req, res));

module.exports = router;
