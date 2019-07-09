const express = require('express');

const router = express.Router();

router.use('/user', require('./user'))

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'EaaSI Internal Web API (version 1.0)' });
});

module.exports = router;
