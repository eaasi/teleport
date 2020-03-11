import { DOMAIN, MAX_AGE } from '@/config/jwt-config';
import samlConfig from '@/config/saml-config';
import AppLogger from '@/logging/appLogger';
import { Request, Response } from 'express';
import fs from 'fs';
import { Strategy as SamlStrategy } from 'passport-saml';
import path from 'path';
import BaseController from './base/BaseController';

const SP_CERT_RELPATH = process.env.SP_CERT_RELPATH;
const IDP_CERT_RELPATH = process.env.IDP_CERT_RELPATH;
const CLIENT_URL = process.env.EAASI_CLIENT_URL;
const AUTH_LOGOUT_URL = process.env.AUTH_LOGOUT_URL;
const JWT_NAME = process.env.JWT_NAME;

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

		res.cookie(JWT_NAME, req.user.token, {
			expires,
			domain: DOMAIN,
			path: '/'
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
		res.clearCookie(JWT_NAME, {
			domain: DOMAIN,
			path: '/'
		});
		// TODO: Figure out if logout from the eaasi ui should log out from SAML Service Provider
		res.json({ redirect: true, redirectTo: AUTH_LOGOUT_URL });
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
			console.error(e);
			res.status(401).send('Login failed');
		}
	}

}

module.exports = EaasiAuthController;
