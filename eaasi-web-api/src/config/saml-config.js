/**
 * SAML SP Configuration
 */

import fs from 'fs';
import path from 'path';

const SAML_ID            = process.env.SAML_ID;
const SAML_CALLBACK_URL  = process.env.SAML_CALLBACK_URL;
const SAML_ENTRYPOINT_URL = process.env.SAML_ENTRYPOINT_URL;
const SP_CERT_RELPATH    = process.env.SP_CERT_RELPATH;
const IDP_CERT_RELPATH   = process.env.IDP_CERT_RELPATH;

const PRIVATE_CERT = fs.readFileSync(path.resolve(SP_CERT_RELPATH), 'utf8');
const IDP_CERT = fs.readFileSync(path.resolve(IDP_CERT_RELPATH), 'utf8');

export default {
	ID: SAML_ID,
	callbackUrl: SAML_CALLBACK_URL,
	entryPoint: SAML_ENTRYPOINT_URL,
	issuer: 'passport-saml',
	privateCert: PRIVATE_CERT,
	cert: IDP_CERT,
	decryptionPvk: PRIVATE_CERT
};
