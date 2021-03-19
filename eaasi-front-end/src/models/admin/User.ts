import { IEaasiUser } from 'eaasi-admin';
import { ROLES_MAPPER, userRoles } from '@/utils/constants';
import { IKeycloakUser } from '@/types/Keycloak';

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

	constructor(user: IKeycloakUser = null) {
		if (user) {
			this.id = user.sub;
			this.email = user.email;
			this.firstName = user.given_name;
			this.lastName = user.family_name;
			this.username = user.preferred_username;
			this.roleId = user.roles.length > 0 ? ROLES_MAPPER[user.roles[0]] : userRoles.CONTRIBUTOR;
		}
	}

	get userHasEditPermissions() {
		return this.roleId === userRoles.ADMIN
			|| this.roleId === userRoles.MANAGER;
	}
}