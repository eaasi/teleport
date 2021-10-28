import Cookies from 'js-cookie';
import config from '@/config';

export function getUserToken(): string {
	return Cookies.get(config.JWT_NAME);
}

export function setUserToken(token: string): void {
	Cookies.set(config.JWT_NAME, token, { path: '/' });
}