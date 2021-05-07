import { NextFunction, Request, Response } from 'express';
import KeycloakService from '@/services/keycloak/KeycloakService';

const keycloakService = new KeycloakService();

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
	const response = await keycloakService.getUserInfo(req.headers.authorization);

	if (response.ok) {
	    next();
	} else {
		res.status(401).json({
			error: 'Unauthorized',
		});
	}
}