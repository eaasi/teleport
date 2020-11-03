import { IAuthorizedRequest } from '@/types/auth/Auth';
import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
const ERROR_MESSAGE = 'You\'ve reached the request limit, please try again later.';
const STATUS_CODE = 429;

export const authRequestLimit = rateLimit({
	max: 10,
	windowMs: 5 * 60 * 1000, // 5 minutes
	message: ERROR_MESSAGE,
	handler: (req: Request, res: Response, next: NextFunction) => res.status(STATUS_CODE).json({ message: ERROR_MESSAGE }),
	keyGenerator: (req: Request, res: Response) => `${req.body.email}-${req.ip}`,
});

export const resetPasswordRequestLimit = rateLimit({
	max: 10,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: ERROR_MESSAGE,
	keyGenerator: (req: IAuthorizedRequest, res: Response) => `${req.user.id}-${req.body.email}-${req.ip}`,
});

export const createAccountRequestLimit = rateLimit({
	max: 50,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: ERROR_MESSAGE,
	keyGenerator: (req: IAuthorizedRequest, res: Response) => `${req.user.id}-${req.ip}`,
})