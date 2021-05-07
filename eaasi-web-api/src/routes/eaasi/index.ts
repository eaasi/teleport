import express from 'express';
import { verifyToken } from '@/middleware/auth-middleware';

const router = express.Router();

router.use('/admin', verifyToken, require('./admin'));
router.use('/auth', require('./auth'));
router.use('/error-report', require('./logger'));
router.use('/blog', require('./blog'));
router.use('/resource', verifyToken, require('./resource'));
router.use('/import', verifyToken, require('./import'));
router.use('/emulation-project', verifyToken, require('./emulation-project'));

module.exports = router;
