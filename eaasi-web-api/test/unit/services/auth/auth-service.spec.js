import AuthService from '../../../../src/services/auth/AuthService';

describe('AuthService', () => {
    
	it('on verifyUserHash correct password returns success true', () => {
		let authService = new AuthService();
		const password = 'testpass';
		const hash = authService.createUserHash(password);
		expect(authService.verifyUserHash(password, hash)).toStrictEqual(true);
	});

	it('on verifyUserHash incorrect hash returns success false', () => {
		let authService = new AuthService();
		expect(authService.verifyUserHash('foo', 'foo')).toStrictEqual(false);
	});

	it('on createUserHash creates user hash', () => {
		let authService = new AuthService();
		expect(authService.createUserHash('foo')).toBeTruthy();
	});
	
});
