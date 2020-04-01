import bcrypt from 'bcrypt';
import BaseService from '../base/BaseService';

/**
 * Handles business logic related to working with User and Role data
 */
export default class AuthService extends BaseService {
	constructor() {
		super();
	}

	createUserHash(password: string): string {
		return bcrypt.hashSync(password, 10);
	}

	verifyUserHash(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
	
}
