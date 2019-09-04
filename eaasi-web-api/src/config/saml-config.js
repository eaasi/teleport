/**
 * SAML SP Configuration
 */

import fs from 'fs';
import path from 'path';

const SAML_ID             = process.env.SAML_ID;
const SAML_CALLBACK_URL   = process.env.SAML_CALLBACK_URL;
const SAML_ENTRYPOINT_URL = process.env.SAML_ENTRYPOINT_URL;
const SP_CERT_RELPATH     = process.env.SP_CERT_RELPATH;
const IDP_CERT_RELPATH    = process.env.IDP_CERT_RELPATH;

const PRIVATE_CERT = fs.readFileSync(path.resolve(SP_CERT_RELPATH), 'utf8');
const IDP_CERT = fs.readFileSync(path.resolve(IDP_CERT_RELPATH), 'utf8');

console.log('--------------- saml-config.js -----------------');
console.log('saml_id', SAML_ID);
console.log('saml_callback_url', SAML_CALLBACK_URL);
console.log('saml_entrypoint_url', SAML_ENTRYPOINT_URL);
console.log('sp_cert_relpath', SP_CERT_RELPATH);
console.log('idp_cert_relpath', IDP_CERT_RELPATH);
console.log('private_cert', '\n', PRIVATE_CERT.slice(0, 80));
console.log('idp_cert', '\n', IDP_CERT.slice(0, 80));
console.log('--------------- end saml-config.js -----------------');

export default {
	ID: SAML_ID,
	callbackUrl: SAML_CALLBACK_URL,
	entryPoint: SAML_ENTRYPOINT_URL,
	issuer: 'passport-saml',
	privateCert: PRIVATE_CERT,
	cert: IDP_CERT,
	decryptionPvk: PRIVATE_CERT
};
