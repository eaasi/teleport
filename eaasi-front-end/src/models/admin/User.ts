import { IEaasiUser } from 'eaasi-admin';
import { userRoles } from '@/utils/constants';

export default class User implements IEaasiUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	roleId: number = userRoles.CONTRIBUTOR;
	createdAt: Date;
	updatedAt: Date;
	lastLogin: Date;

	constructor(user: IEaasiUser = null) {
		if (user) {
			this.id = user.id;
			this.email = user.email;
			this.firstName = user.firstName;
			this.lastName = user.lastName;
			this.username = user.username;
			this.roleId = user.roleId;
			this.createdAt = user.createdAt;
			this.updatedAt = user.updatedAt;
			this.lastLogin = user.lastLogin;
		}
	}

	get userHasEditPermissions() {
		return this.roleId === userRoles.ADMIN 
			|| this.roleId === userRoles.MANAGER;
	}
}