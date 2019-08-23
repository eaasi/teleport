import express, { Request, Response, NextFunction } from 'express';
import EaasiUserService from '../services/EaasiUserService';
import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
class EaasiAuthController {

    /**
     * Callback URL for shibboleth SP login
     * @param req request
     * @param res response
     */
    async login(req: Request, res: Response) {
		let svc = new EaasiUserService();
		svc.getByPk(Number(req.body.userId)).then(dbRes => {
			if(!dbRes || !dbRes.result) return res.json(false);
			let user = dbRes.result.get({plain: true});
			let token = jwt.sign(user, JWT_SECRET, {
				expiresIn: '24h'
			});
			return res.json({user, token});
		});
    }

    /**
     * Logs a user out
     * @param req request
     * @param res response
     */
    async logout(req: Request, res: Response) {
		// TODO
        console.log("Not implemented");
        await res.json({});
    }

    /**
     * Renews a JWT
     * @param req request
     * @param res response
     */
    async refresh(req: Request, res: Response) {
        // TODO
        console.log("Not implemented");
        await res.json({});
    }
}

module.exports = EaasiAuthController;
