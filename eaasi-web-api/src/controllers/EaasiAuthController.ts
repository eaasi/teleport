import { Request, Response} from 'express';
import samlConfig from '../config/saml-config';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';
import path from 'path';

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
		// TODO: This should be caught by saml middleware. If not, then what?
	}

	/**
     * Callback URL for shibboleth SP login
     * @param req request
     * @param res response
     */
	callback(req: Request, res: Response) {
		req.method = 'GET';
		res.redirect(`http://localhost:8084/login/auth?t=${req.user.token}`);
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
			res.status(401).send('Login failed');
		}
	}
}

module.exports = EaasiAuthController;
