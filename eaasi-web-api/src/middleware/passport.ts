import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt, { Secret as JwtSecret } from 'jsonwebtoken';
import samlConfig from '../config/saml-config.js';
import { Strategy as SamlStrategy } from 'passport-saml';
import EaasiUserService from '../services/EaasiUserService';
import { MAX_AGE, SECRET } from '../config/jwt-config';

// TODO: implement types

/*============================================================
 == JWT
/============================================================*/

passport.use(new passportJWT.Strategy({
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET
}, (jwtPayload: any, done: any) => {
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
			let token = jwt.sign(user, SECRET as JwtSecret, {
				expiresIn: MAX_AGE
			});
			done(null, {user, token});
		}
	});
}));
