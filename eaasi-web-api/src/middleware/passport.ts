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
	done(null, jwtPayload);
}));

/*============================================================
 == SAML
/============================================================*/

passport.use(new SamlStrategy(samlConfig, function(profile: any, done: any) {
	let svc = new EaasiUserService();
	let email = profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
	svc.getByEmail(email).then(dbRes => {
		if(!dbRes || !dbRes.result) {
			done('ERROR!');
		} else {
			let user = dbRes.result.get({plain: true});
			let token = jwt.sign(user, JWT_SECRET, {
				expiresIn: '24h'
			});
			done(null, {user, token});
		}
	});
}));
