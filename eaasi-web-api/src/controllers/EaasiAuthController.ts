import { Request, Response} from 'express';
import samlConfig from '../config/saml-config';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';
import path from 'path';
import { MAX_AGE } from '../config/jwt-config';

const SP_CERT_RELPATH = process.env.SP_CERT_RELPATH as string;
const IDP_CERT_RELPATH = process.env.IDP_CERT_RELPATH as string;
const CLIENT_URL = process.env.EAASI_CLIENT_URL as string;

export default class EaasiAuthController {

	/**
     * Callback URL for shibboleth SP login
     * @param req request
     * @param res response
     */
	callback(req: Request, res: Response) {
		req.method = 'GET';
		// Set JWT cookie
		let expires = new Date();
		expires.setSeconds(expires.getSeconds() + MAX_AGE);
		res.cookie('EAASI_TOKEN', req.user.token, {
			expires
		});
		res.redirect(CLIENT_URL);
	}

	/**
     * Gets logged in user data
     * @param req request
     * @param res response
     */
	user(req: Request, res: Response) {
		res.json(req.user);
	}

	/**
     * Logs a user out
     * @param req request
     * @param res response
     */
	logout(req: Request, res: Response) {
		req.logout();
		res.redirect('http://localhost:8084');
	}

	/**
     * Renews a JWT
     * @param req request
     * @param res response
     */
	refresh(req: Request, res: Response) {
		// TODO
		console.log('Not implemented');
		res.json({});
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
			res.status(401).send('Login failed');
		}
	}

}

module.exports = EaasiAuthController;
