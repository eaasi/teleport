import jwt from 'jsonwebtoken';
import { IEaasiUser } from 'eaasi-auth';

const SECRET = process.env.VUE_APP_JWT_SECRET;

export function validateUserToken(token: string): IEaasiUser {
	try {
		let user = jwt.verify(token, SECRET) as IEaasiUser;
		localStorage.setItem('EAASI_TOKEN', token);
		return user;
	} catch(err) {
		console.warn('JWT Error', err);
		localStorage.removeItem('EAASI_TOKEN');
		return null;
	}
}