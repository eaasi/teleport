import express from 'express';
import passport from 'passport';

const router = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.use('/admin', jwtAuth, require('./admin'));
router.use('/auth', require('./auth'));
router.use('/error-report', require('./logger'));
router.use('/blog', require('./blog'));
router.use('/resource', jwtAuth, require('./resource'));
router.use('/import', jwtAuth, require('./import'));
router.use('/emulation-project', jwtAuth, require('./emulation-project'));
router.use('/emulation-project-resource', jwtAuth, require('./emulation-project-resource'));

module.exports = router;
