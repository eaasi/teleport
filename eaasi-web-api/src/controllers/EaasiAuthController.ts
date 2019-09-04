import { Request, Response} from 'express';
import EaasiUserService from '../services/EaasiUserService';
import jwt, { Secret } from 'jsonwebtoken';
import samlConfig from '../config/saml-config';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const SP_CERT_RELPATH = process.env.SP_CERT_RELPATH as string;
const IDP_CERT_RELPATH = process.env.IDP_CERT_RELPATH as string;

class EaasiAuthController {

	constructor() {
	}

	/**
     * Callback URL for Shibboleth SP login
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
		console.log('Not implemented');
		await res.json({});
	}

	/**
     * Renews a JWT
     * @param req request
     * @param res response
     */
	async refresh(req: Request, res: Response) {
		// TODO
		console.log('Not implemented');
		await res.json({});
	}

	/**
	 * Get Shibboleth SP metadata XML
	 * @param req request
     * @param res response
	 */
	shibbolethXml(req: Request, res: Response) {
		try {
			let cert = fs.readFileSync(path.resolve(SP_CERT_RELPATH), 'utf8');
			let idpCert = fs.readFileSync(path.resolve(IDP_CERT_RELPATH), 'utf8');
			let samlStrategy = new SamlStrategy(samlConfig, () => null);
			res.type('application/xml');
			res.status(200);
			let xml = samlStrategy.generateServiceProviderMetadata(cert, idpCert);
			res.send(xml);
		} catch(e) {
			console.log(e);
			// res.send('no');
		}
	}
}

module.exports = EaasiAuthController;
