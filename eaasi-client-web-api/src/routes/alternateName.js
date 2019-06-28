const express = require('express');
const router = express.Router();
const models = require('../data_access/models');
const AlternateName = models.alternateName;

/* GET alternateName list */
router.get('/', (req, res, next) => {
    AlternateName.findAll({
        attributes: ['alternateNameID', 'alternateName']
    }).then(alternateNames => res.json({
        error: false,
        data: alternateNames
    })).catch(err => res.json({
        data: [],
        error: err
    }))
});

/* GET alternateName */
router.get('/:id', (req, res, next) => {
});

/* POST alternateName */
router.post('/', (req, res, next) => {
});

/* PUT alternateName */
router.put('/:id', (req, res, next) => {
});

/* DELETE alternateName */
router.delete('/:id', (req, res, next) => {
});

module.exports = router;
