import {NextFunction, Request, Response} from 'express';
import HttpJSONService from '@/services/base/HttpJSONService';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const httpService = new HttpJSONService();

	const url = 'https://dps.eaasi.cloud/auth/realms/master/protocol/openid-connect/userinfo';
	const options = {
		headers: {
			Authorization: req.headers.authorization,
		},
	};

	const response = await httpService.get(url, options);

	if (response.ok) {
	    next();
	} else {
		res.status(401).json({
			error: 'Unauthorized',
		});
	}
}