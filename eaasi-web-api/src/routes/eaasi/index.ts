import express from 'express';
import passport from 'passport';

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use('/admin', jwtAuth, require('./admin'));
router.use('/auth', require('./auth'));
router.use('/task', jwtAuth, require('./task'))

module.exports = router;
