import express from 'express';
import { verifyToken } from '@/middleware/auth-middleware';

const router = express.Router();

router.use('/eaasi-user', verifyToken, require('./eaasi-user'));
router.use('/eaasi-role', verifyToken, require('./eaasi-role'));
router.use('/bookmark', require('./eaasi-bookmark'));
router.use('/eaasi-task', verifyToken, require('./eaasi-task'));

router.get('/', function(req: express.Request, res: express.Response) {
	res.render('index', {
		title: 'EaaSI Internal Web API (version 1.0)'
	});
});

router.get('*', function(req: express.Request, res: express.Response) {
	res.redirect('/');
});

module.exports = router;
