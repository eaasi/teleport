import express from "express";

const router = express.Router();

router.use('/eaasi-user', require('./eaasi-user'))
router.use('/eaasi-role', require('./eaasi-role'))

router.get('/', function(req: express.Request, res: express.Response) {
	res.render('index',
		{
			title: 'EaaSI Internal Web API (version 1.0)'
		});
});

router.get('*', function(req: express.Request, res: express.Response) {
	res.redirect('/')
});

module.exports = router;
