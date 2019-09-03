import passport from 'passport';
import jwt from 'passport-jwt';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';

import { cert } from './public-cert';

const shibCert = fs.readFileSync('../../shibboleth-idp/certificate.pem', {
	encoding: 'utf8'
}).toString();
console.log(shibCert);
console.log(cert);

// TODO: Get the user from the db?
passport.use(new jwt.Strategy({
	jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.JWT_SECRET
}, (jwtPayload, done) => {
	done(null, jwtPayload);
}));

let samlConfig = {
	ID: 'http://localhost:8081',
	callbackUrl: 'http://localhost:8081/auth/login',
	entryPoint: 'https://localhost:443/idp',
	issuer: 'passport-saml',
	// privateCert: shibCert,
	cert
};

passport.use(new SamlStrategy(samlConfig, function(profile, done) {
	console.log('PROFILE', JSON.stringify(profile, null, 4));
	done();
}));