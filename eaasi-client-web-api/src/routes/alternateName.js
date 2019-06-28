const express = require('express');
const router = express.Router();

const AlternateNameService = require('../data_access/service/alternateName')

router.get('/alternateName', async (req, res, next) => {
    let alternateName = await AlternateNameService.getAlternateName();
    res.json(alternateName);
});

module.exports = router;
