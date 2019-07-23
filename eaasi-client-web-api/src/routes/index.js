const express = require('express');

const router = express.Router();

router.use('/eaasi-user', require('./eaasi-user'))
router.use('/eaasi-role', require('./eaasi-role'))
router.use('/', require('./eaasi-auth'))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'EaaSI Internal Web API (version 1.0)' });
});

module.exports = router;
