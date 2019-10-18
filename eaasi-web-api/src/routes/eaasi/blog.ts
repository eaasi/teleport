import BlogFeedController from '@/controllers/BlogFeedController';
import express from 'express';

const router = express.Router();
const controller = new BlogFeedController();

/**
 * @api {get} eaasi/blog/feed Get EaaSI Blog Feed
 * @apiVersion 1.0.0
 * @apiGroup Blog
 * @apiPermission System Administrator only
 * @apiDescription Gets the RSS Feed form the EaaSI Blog from the Software Preservation Network
 * @apiSuccess (200) {Array} articleLinks a list of blog article summary objects
 * @apiSampleRequest http://localhost:8081/eaasi/blog/feed
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 * {"articleLinks":
 *   [
 *     {
 *       "categories":["SPN News"],
 *       "description":"Post written by: Brandon Butler, SPN&#8217;s Law &#38; Policy Advisor Last week, the Software Preservation Network joined an amicus brief filed with the Supreme Court. In this blog post, I’ll say a little bit about the case, Allen v. Cooper,<a class=\"moretag\" href=\"https://www.softwarepreservationnetwork.org/blog/spn-joins-amicus-brief/\"> Read more&#8230;</a>",
 *       "link":"https://www.softwarepreservationnetwork.org/blog/spn-joins-amicus-brief/?utm_source=rss&utm_medium=rss&utm_campaign=spn-joins-amicus-brief",
 *       "pubDate":"2019 Sep 30","title":"Software Preservation Networks Joins Amicus Brief Filed with the Supreme Court"
 *       },
 *       {
 *       "categories":["SPN News"],
 *       "description":"Post written by: Dianne Dietrich and Nance McGovern on behalf of the SPN Steering Committee How do you ensure you’re still on track with your strategic thinking, now that you’ve got the input and attention of more people? Further, how<a class=\"moretag\" href=\"https://www.softwarepreservationnetwork.org/blog/crafting-community-goals/\"> Read more&#8230;</a>",
 *       "link":"https://www.softwarepreservationnetwork.org/blog/crafting-community-goals/?utm_source=rss&utm_medium=rss&utm_campaign=crafting-community-goals",
 *       "pubDate":"2019 Sep 27","title":"Crafting Community Goals: Reflections from SPN’s Steering Committee"
 *       },
 *       {
 *       "categories":["FCoP","FCoP News"],
 *       "description":"Post written by: Cynde Moya, Software Preservation Lab Manager, FCoP Project Lead Living Computers: Museum + Labs (LCM+L) joined the Fostering a Community of Practice: Software Preservation cohort for the opportunity to test the Scaling Emulation-as-a-Service Infrastructure (EaaSI) tool in our<a class=\"moretag\" href=\"https://www.softwarepreservationnetwork.org/blog/fcop-cohort-reflections-living-computers-museum-labs/\"> Read more&#8230;</a>",
 *       "link":"https://www.softwarepreservationnetwork.org/blog/fcop-cohort-reflections-living-computers-museum-labs/?utm_source=rss&utm_medium=rss&utm_campaign=fcop-cohort-reflections-living-computers-museum-labs",
 *       "pubDate":"2019 Sep 22","title":"FCoP Cohort Reflections: Living Computers: Museum + Labs"}
 *   ],
 *    "blogDescription":"Saving Software Together","blogTitle":"Blog – Saving Software Together"
 * }
 */
router.get('/feed', (req, res) => controller.getFeed(req, res));

module.exports = router;
