import rateLimit from 'express-rate-limit';

const ERROR_MESSAGE = 'You reached the request limit, please try again later.';

export const authRequestLimit = rateLimit({
	max: 10,
	windowMs: 3 * 60 * 1000, // 3 minutes
	message: ERROR_MESSAGE,
});

export const resetPasswordRequestLimit = rateLimit({
	max: 10,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: ERROR_MESSAGE,
});

export const createAccountRequestLimit = rateLimit({
	max: 25,
	windowMs: 60 * 60 * 1000, // 1 hour
	message: ERROR_MESSAGE,
})