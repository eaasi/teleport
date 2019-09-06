import express from 'express';
import passport from 'passport';

const router = express.Router();
router.use('/auth', require('./eaasi-auth'));
router.use('/eaasi-user', passport.authenticate('jwt', {session: false}), require('./eaasi-user'));
router.use('/eaasi-role', passport.authenticate('jwt', {session: false}), require('./eaasi-role'));

router.get('/', function(req: express.Request, res: express.Response) {

	res.render('index',
		{
			title: 'EaaSI Internal Web API (version 1.0)'
		});
});

router.get('*', function(req: express.Request, res: express.Response) {
	res.redirect('/');
});

module.exports = router;
