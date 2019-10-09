import express from 'express';
import passport from 'passport';

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use('/admin', jwtAuth, require('./admin'));
router.use('/auth', require('./auth'));
router.use('/blog', require('./blog'))
router.use('/task', jwtAuth, require('./task'))
router.use('/resource', jwtAuth, require('./resource'));

module.exports = router;
