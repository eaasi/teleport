import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import EaasiUserService from '../services/EaasiUserService';
import jwt from 'passport-jwt';

// TODO: Replace this with SAML / Shibboleth Strategy
passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, (email, password, done) => {
	let svc = new EaasiUserService();
	svc.getByEmail(email).then(user => {
		if(!user) done('User not found', false);
		user = user.get({plain: true});
		return done(null, user, { message: 'Success' });
	});
}));

// TODO: Get the user from the db?
passport.use(new jwt.Strategy({
	jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.JWT_SECRET
}, (jwtPayload, done) => {
	done(null, jwtPayload);
}));