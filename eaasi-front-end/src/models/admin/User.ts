import { IEaasiUser } from 'eaasi-admin';

export default class User implements IEaasiUser {

	private userRoles = {
		ADMIN: 1,
		MANAGER: 2,
		CONTRIBUTOR: 3
	};

	id: number;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	roleId: number = this.userRoles.CONTRIBUTOR;
	createdAt: Date;
	updatedAt: Date;
	lastLogin: Date;

	constructor(user: IEaasiUser) {
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

	get userHasEditPermissions() {
		return this.roleId === this.userRoles.ADMIN 
			|| this.roleId === this.userRoles.MANAGER;
	}
}