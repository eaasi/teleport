import passport from 'passport';
import passportJWT from 'passport-jwt';
import jwt, { Secret as JwtSecret } from 'jsonwebtoken';
import samlConfig from '../config/saml-config.js';
import { Strategy as SamlStrategy } from 'passport-saml';
import UserAdminService from '@/services/admin/UserAdminService';
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
	let svc = new UserAdminService();
	let email = profile[USER_EMAIL_CLAIM];
	svc.getUserByEmail(email)
		.then(user => {
			if(!user) {
				done(`Error retrieving information using claim ${USER_EMAIL_CLAIM} with value ${email}`);
			} else {
				let res = user.get({plain: true});
				let token = jwt.sign(res, SECRET as JwtSecret, {
					expiresIn: MAX_AGE
				});
				done(null, {res, token});
			}
		}).catch((err) => {
			done(err.stack)
		});
}));
