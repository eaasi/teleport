import { IEaasiUser } from 'eaasi-admin';
import { userRoles } from '@/utils/constants';

export default class User implements IEaasiUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	roleId: number = userRoles.CONTRIBUTOR;
	createdAt: Date;
	updatedAt: Date;
	lastLogin: Date;

	constructor(user: any = null) {
		if (user) {
			this.id = user.sub;
			this.email = user.email;
			this.firstName = user.given_name;
			this.lastName = user.family_name;
			this.username = user.preferred_username;
			//TODO: get role from keycloak
			this.roleId = userRoles.ADMIN;
		}
	}

	get userHasEditPermissions() {
		return this.roleId === userRoles.ADMIN
			|| this.roleId === userRoles.MANAGER;
	}
}