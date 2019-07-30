import express from "express";

const router = express.Router();

router.use('/eaasi-user', require('./eaasi-user'))
router.use('/eaasi-role', require('./eaasi-role'))
router.use('/', require('./eaasi-auth'))

/* GET home page. */
router.get('/', function(req: express.Request, res: express.Response, next: express.NextFunction) {
	res.render('index', { title: 'EaaSI Internal Web API (version 1.0)' });
});

module.exports = router;
