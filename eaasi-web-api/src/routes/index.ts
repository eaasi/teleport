import express from 'express';
import passport from 'passport';

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use('/auth', require('./eaasi-auth'));
router.use('/eaasi-user', jwtAuth, require('./eaasi-user'));
router.use('/eaasi-role', jwtAuth, require('./eaasi-role'));
router.use('/emulator', jwtAuth, require('./emulator'));

router.get('/', function(req: express.Request, res: express.Response) {
	res.render('index', {
		title: 'EaaSI Internal Web API (version 1.0)'
	});
});

router.get('*', function(req: express.Request, res: express.Response) {
	res.redirect('/');
});

module.exports = router;