import { DOMAIN, MAX_AGE } from '@/config/jwt-config';
import samlConfig from '@/config/saml-config';
import IEaasiUser from '@/data_access/interfaces/IEaasiUser';
import { IEaasiUserHash } from '@/data_access/interfaces/IEaasiUserHash';
import AuthService from '@/services/auth/AuthService';
import UserHashService from '@/services/auth/UserHashService';
import UserService from '@/services/user/UserService';
import { IAuthorizedRequest, IChangePasswordRequest, ILoginRequest } from '@/types/auth/Auth';
import { Request, Response } from 'express';
import fs from 'fs';
import jwt, { Secret as JwtSecret } from 'jsonwebtoken';
import { Strategy as SamlStrategy } from 'passport-saml';
import path from 'path';
import { SECRET } from '@/config/jwt-config';
import BaseController from './base/BaseController';
import KeycloakService from '@/services/keycloak/KeycloakService';

const SP_CERT_RELPATH = process.env.SP_CERT_RELPATH;
const IDP_CERT_RELPATH = process.env.IDP_CERT_RELPATH;
const CLIENT_URL = process.env.EAASI_CLIENT_URL;
const AUTH_LOGOUT_URL = process.env.AUTH_LOGOUT_URL;
const JWT_NAME = process.env.JWT_NAME;
const SAML_ENABLED = process.env.SAML_ENABLED == 'True' || process.env.SAML_ENABLED == 'true';

export default class EaasiAuthController extends BaseController {

	private readonly _userService: UserService;
	private readonly _authService: AuthService;
	private readonly _userHashService: UserHashService;
	private readonly _keycloakService: KeycloakService;

	constructor() {
		super();
		this._userService = new UserService();
		this._keycloakService = new KeycloakService();
		if (!SAML_ENABLED) {
			this._authService = new AuthService();
			this._userHashService = new UserHashService();
		}
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

	async authenticate(req: Request, res: Response) {
		try {
			if (SAML_ENABLED) {
				throw new Error('invalid endpoint');
			}
			const { email, password }: ILoginRequest = req.body;
			const user = await this._userService.getUserByEmail(email);
			const plainUser = user.get({ plain: true }) as IEaasiUser;
			if (user == null) {
				res.json({ success: false, error: 'Invalid credentials' });
			}
			const userHash = await this._userHashService.getUserHash(plainUser.id)
			const plainUserHash = userHash.get({ plain: true }) as IEaasiUserHash;
			if (plainUserHash == null) {
				res.json({ success: false, error: 'Invalid credentials' });
			}
			// check the hash
			const isPasswordValid = this._authService.verifyUserHash(password, plainUserHash.hash);
			if (!isPasswordValid) {
				res.json({ success: false, error: 'Invalid credentials' })
			}
			// record user login
			await this._userService.recordLastLogin(plainUser.id);
			let expires = new Date();
			expires.setSeconds(expires.getSeconds() + MAX_AGE);
			jwt.sign(plainUser, SECRET as JwtSecret, { expiresIn: MAX_AGE }, (err, token) => {
				if (err) throw err;
				res.cookie(JWT_NAME, token, {
					expires,
					domain: DOMAIN,
					path: '/'
				});
				res.json({ success: true, token });
			});
		} catch(e) {
			return this.sendError(e, res);
		}
	}

	/**
     * Callback URL for Shibboleth SP login
     * @param req request
     * @param res response
     */
	callback(req: IAuthorizedRequest, res: Response) {
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

	/***
	 * Changes a user's password
     * @param req request
     * @param res response
	 */
	async changePassword(req: IChangePasswordRequest, res: Response) {
		try {
			let userHash = await this._userHashService.getUserHash(req.user.id);
			if(!this._authService.verifyUserHash(req.body.password, userHash.hash)) {
				return this.sendClientError('Incorrect password', res);
			}
			await this._userHashService.saveUserHash({
				hash: this._authService.createUserHash(req.body.newPassword),
				userId: req.user.id
			});
			res.json(true);
		} catch(e) {
			this.sendError(e, res);
		}
	}

	/**
     * Gets logged in user data
     * @param req request
     * @param res response
     */
	async user(req: IAuthorizedRequest, res: Response) {
		try {
			const response = await this._keycloakService.getUserInfo(req.headers.authorization);
			if (response != null) {
				res.json(await response.json());
			} else {
				res.status(401);
				res.send(null);
			}
		} catch(e) {
			this.sendClientError(e, res);
		}
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
		if (SAML_ENABLED) {
			// TODO: Figure out if logout from the eaasi ui should log out from SAML Service Provider
			res.json({ redirect: true, redirectTo: AUTH_LOGOUT_URL });
		} else {
			res.send(true);
		}
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
