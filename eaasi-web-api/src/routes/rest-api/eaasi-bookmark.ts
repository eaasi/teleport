import express, { Request, Response } from 'express';
import EaasiBookmarkController from '@/controllers/rest-api/EaasiBookmarkController';

const router = express.Router();

const controller = new EaasiBookmarkController();

router
	.get('/', (req, res) => controller.getByUserID(req, res))
	.post('/', (req, res) => controller.create(req, res))
	.delete('/', (req, res) => controller.delete(req, res));

module.exports = router;
