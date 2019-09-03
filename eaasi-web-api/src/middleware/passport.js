import passport from 'passport';
import jwt from 'passport-jwt';
import samlConfig from '../config/saml-config.js';
import { Strategy as SamlStrategy } from 'passport-saml';
import fs from 'fs';

/*============================================================
 == JWT
/============================================================*/

passport.use(new jwt.Strategy({
	jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.JWT_SECRET
}, (jwtPayload, done) => {
	done(null, jwtPayload);
}));

/*============================================================
 == SAML
/============================================================*/

passport.use(new SamlStrategy(samlConfig, function(profile, done) {
	console.log('PROFILE', JSON.stringify(profile, null, 4));
	done();
}));