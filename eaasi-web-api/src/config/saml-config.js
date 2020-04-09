/**
 * SAML SP Configuration
 */

import fs from 'fs';
import path from 'path';

const SAML_ENABLED = process.env.SAML_ENABLED == 'True' || process.env.SAML_ENABLED == 'true';

export const SAML_ID                 = process.env.SAML_ID;
export const SAML_CALLBACK_URL       = process.env.SAML_CALLBACK_URL;
export const SAML_ENTRYPOINT_URL     = process.env.SAML_ENTRYPOINT_URL;
export const SAML_LOGOUT_URL 	     = process.env.SAML_LOGOUT_URL;
export const SP_PRIVATE_CERT_RELPATH = process.env.SP_PRIVATE_CERT_RELPATH;
export const IDP_CERT_RELPATH        = process.env.IDP_CERT_RELPATH;
export const PRIVATE_CERT 			 = SAML_ENABLED ? fs.readFileSync(path.resolve(SP_PRIVATE_CERT_RELPATH), 'utf8') : '';
export const IDP_CERT 				 = SAML_ENABLED ? fs.readFileSync(path.resolve(IDP_CERT_RELPATH), 'utf8') : '';

export default {
	ID: SAML_ID,
	callbackUrl: SAML_CALLBACK_URL,
	entryPoint: SAML_ENTRYPOINT_URL,
	issuer: 'passport-saml',
	privateCert: PRIVATE_CERT,
	cert: IDP_CERT,
	decryptionPvk: PRIVATE_CERT,
	logoutUrl: SAML_LOGOUT_URL,
};
