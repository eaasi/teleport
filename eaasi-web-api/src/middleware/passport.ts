import jwt, { Secret as JwtSecret } from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as SamlStrategy } from 'passport-saml';
import { MAX_AGE, SECRET } from '../config/jwt-config';
import samlConfig from '../config/saml-config.js';

const SAML_ENABLED = process.env.SAML_ENABLED == 'True' || process.env.SAML_ENABLED == 'true';
// TODO: implement types

/*============================================================
 == JWT
/============================================================*/

/*passport.use(new passportJWT.Strategy({
	jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET
}, (jwtPayload: any, done: any) => {
	done(null, jwtPayload);
}));*/

/*============================================================
 == SAML
/============================================================*/

/*const USER_EMAIL_CLAIM = process.env.USER_EMAIL_CLAIM_PROPERTY;

if (SAML_ENABLED) {
	
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
}*/
