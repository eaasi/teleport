const express = require('express');

const router = express.Router();

router.use('/user-information', require('./userInformation'))
router.use('/software-version', require('./softwareVersion'))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'EaaSI Internal Web API (version 1.0)' });
});

module.exports = router;
