import jwt from 'jsonwebtoken';
import { IEaasiUser } from 'eaasi-admin';

const SECRET = process.env.VUE_APP_JWT_SECRET;
const JWT_NAME = process.env.VUE_APP_JWT_NAME;

export function validateUserToken(token: string): IEaasiUser {
	try {
		let user = jwt.verify(token, SECRET) as IEaasiUser;
		localStorage.setItem(JWT_NAME, token);
		return user;
	} catch(err) {
		console.warn('JWT Error', err);
		localStorage.removeItem(JWT_NAME);
		return null;
	}
}