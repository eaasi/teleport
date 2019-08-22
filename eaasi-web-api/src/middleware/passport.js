import passport from 'passport';
import jwt from 'passport-jwt';

// TODO: Get the user from the db?
passport.use(new jwt.Strategy({
	jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.JWT_SECRET
}, (jwtPayload, done) => {
	done(null, jwtPayload);
}));