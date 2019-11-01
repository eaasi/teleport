import { Request, Response} from 'express';
import samlConfig from '@/config/saml-config';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';
import path from 'path';
import { DOMAIN, MAX_AGE } from '@/config/jwt-config';
import BaseController from './base/BaseController';
import UserAdminService from '@/services/admin/UserAdminService';
import AppLogger from '@/logging/appLogger';

const SP_CERT_RELPATH = process.env.SP_CERT_RELPATH as string;
const IDP_CERT_RELPATH = process.env.IDP_CERT_RELPATH as string;
const CLIENT_URL = process.env.EAASI_CLIENT_URL as string;
const SAML_LOGOUT_URL = process.env.SAML_LOGOUT_URL as string;

export default class EaasiAuthController extends BaseController {

	readonly _logger: AppLogger;

	constructor() {
		super();
		this._logger = new AppLogger(this.constructor.name);
	}

	/**
     * SAML protected login route
     * @param req request
     * @param res response
     */
	login(req: Request, res: Response) {
		// This should get redirected by passport-saml middleware,
		// if not, fallback to the client root
		res.redirect(CLIENT_URL);
	}

	/**
     * Callback URL for Shibboleth SP login
     * @param req request
     * @param res response
     */
	callback(req: Request, res: Response) {
		req.method = 'GET';
		// Set JWT cookie
		let expires = new Date();

		expires.setSeconds(expires.getSeconds() + MAX_AGE);

		res.cookie('EAASI_TOKEN', req.user.token, {
			expires,
			domain: DOMAIN
		});

		let userService = new UserAdminService();
		let logger = new AppLogger('AuthController');

	    userService.setUserLastLogin(req.user.res.id).then(() => {
	    	logger.log.info(`User logged in: ${req.user.res.email}`)
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
		//TODO: Call logout
		res.redirect(CLIENT_URL);
	}

	/**
     * Renews a JWT
     * @param req request
     * @param res response
     */
	refresh(req: Request, res: Response) {
		// TODO
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
