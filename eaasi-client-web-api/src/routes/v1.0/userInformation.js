const express = require('express');
const router = express.Router();

const UserInformationController = require('../../controllers/UserInformationController');
const controller = new UserInformationController();

router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.get(req, res));
router.post('/', (req, res) => controller.create(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

module.exports = router;
