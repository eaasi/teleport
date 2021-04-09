import {IEaasiUser, IKeycloakUserInfo} from 'eaasi-admin';
import {ROLES_MAPPER, userRoles} from '@/utils/constants';
import {IKeycloakUser} from '@/types/Keycloak';

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

	constructor(user: IKeycloakUser | IKeycloakUserInfo = null) {
		if (user) {
			if (this._isKeycloakUser(user)) {
				this.id = user.sub;
				this.email = user.email;
				this.firstName = user.given_name;
				this.lastName = user.family_name;
				this.username = user.preferred_username;
				this.roleId = user.roles.length > 0 ? ROLES_MAPPER[user.roles[0]] : userRoles.CONTRIBUTOR;
			} else {
				this.id = user.id;
				this.email = user.email;
				this.firstName = user.firstName;
				this.lastName = user.lastName;
				this.username = user.username;
				this.roleId = user.attributes && user.attributes.role && user.attributes.role.length > 0 ?
					ROLES_MAPPER[user.attributes.role[0]] : userRoles.CONTRIBUTOR;
			}
		}
	}

	get userHasEditPermissions() {
		return [userRoles.ADMIN, userRoles.MANAGER, userRoles.CONTRIBUTOR]
			.includes(this.roleId);
	}

	copy() {
		let newUser = new User();
		newUser.id = this.id;
		newUser.email = this.email;
		newUser.firstName = this.firstName;
		newUser.lastName = this.lastName;
		newUser.username = this.username;
		newUser.roleId = this.roleId;
		return newUser;
	}

	toKeycloakUserInfo(): IKeycloakUserInfo  {
		let user: IKeycloakUserInfo =  {
			id: this.id,
			username: this.username,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email,
			attributes: {
				role: [Object.keys(ROLES_MAPPER).find(role => ROLES_MAPPER[role] === this.roleId)]
			}
		};

		if (this.roleId === userRoles.ADMIN) {
			user.realmRoles = ['admin'];
		}

		return user;
	}

	_isKeycloakUser(obj: any): obj is IKeycloakUser {
		return (obj && obj.sub);
	}
}