import express from 'express';
import passport from 'passport';

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use('/eaasi-user', jwtAuth, require('./eaasi-user'));
router.use('/eaasi-role', jwtAuth, require('./eaasi-role'));
router.use('/bookmark', require('./eaasi-bookmark'));
router.use('/eaasi-task', jwtAuth, require('./eaasi-task'));

router.get('/', function(req: express.Request, res: express.Response) {
	res.render('index', {
		title: 'EaaSI Internal Web API (version 1.0)'
	});
});

router.get('*', function(req: express.Request, res: express.Response) {
	res.redirect('/');
});

module.exports = router;
