import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt, { Secret } from 'jsonwebtoken';
import samlConfig from '../config/saml-config.js';
import { Strategy as SamlStrategy } from 'passport-saml';
import EaasiUserService from '../services/EaasiUserService';

// TODO: implement types

/*============================================================
 == JWT
/============================================================*/

const JWT_SECRET = process.env.JWT_SECRET as Secret;

passport.use(new passportJWT.Strategy({
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: JWT_SECRET
}, (jwtPayload: any, done: any) => {
	console.log(jwtPayload);
	done(null, jwtPayload);
}));

/*============================================================
 == SAML
/============================================================*/

const USER_EMAIL_CLAIM = process.env.USER_EMAIL_CLAIM_PROPERTY as string;

passport.use(new SamlStrategy(samlConfig, function(profile: any, done: any) {
	let svc = new EaasiUserService();
	let email = profile[USER_EMAIL_CLAIM];
	svc.getByEmail(email).then(dbRes => {
		if(!dbRes || !dbRes.result) {
			done(`Error retrieving information using claim ${USER_EMAIL_CLAIM} with value ${email}`);
		} else {
			let user = dbRes.result.get({plain: true});
			let token = jwt.sign(user, JWT_SECRET, {
				expiresIn: '24h' // TODO: This should match IDP token expiration
			});
			done(null, {user, token});
		}
	});
}));
