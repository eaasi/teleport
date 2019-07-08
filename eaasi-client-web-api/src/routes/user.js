const UserInformation = require('../data_access/models').UserInformation;

const express = require('express');
const router = express.Router();

router.get( "/user", (req, res) =>
	UserInformation.findAll().then( (result) => res.json(result) )
);

router.get( "/user/:id", (req, res) =>
    UserInformation.findByPk(req.params.id).then( (result) => res.json(result))
);

module.exports = router;
