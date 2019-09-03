import express, { Request, Response, NextFunction } from 'express';
import EaasiUserService from '../services/EaasiUserService';
import jwt, { Secret } from 'jsonwebtoken';
import samlConfig from '../config/saml-config';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET as Secret;
class EaasiAuthController {

	constructor() {
		console.log('Constructed!');
	}

	/**
     * Callback URL for shibboleth SP login
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
		console.log('In callback', req.user);
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
			let cert = fs.readFileSync(path.resolve('certs/cert.pem'), 'utf8');
			let idpCert = fs.readFileSync(path.resolve('certs/idp-cert.pem'), 'utf8');
			console.log('here!', cert);
			let samlStrategy = new SamlStrategy(samlConfig, () => null);
			res.type('application/xml');
			res.status(200);
			let xml = samlStrategy.generateServiceProviderMetadata(cert, idpCert);
			console.log('XML', xml);
			res.send(xml);
		} catch(e) {
			console.log(e);
			res.send('no');
		}
	}
}

module.exports = EaasiAuthController;
