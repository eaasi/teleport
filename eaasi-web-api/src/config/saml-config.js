import fs from 'fs';
import path from 'path';

const privateCert = fs.readFileSync(path.resolve('certs/key.pem'), 'utf8');
const idpCert = fs.readFileSync(path.resolve('certs/idp-cert.pem'), 'utf8');

// TODO: Urls should be env variables
export default {
	ID: 'http://localhost:8081',
	callbackUrl: 'http://localhost:8081/auth/login',
	entryPoint: 'https://localhost:443/idp',
	issuer: 'passport-saml',
	privateCert,
	cert: idpCert,
	decryptionPvk: privateCert
};