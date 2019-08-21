declare module 'eaasi-auth' {

	export interface IEaasiUser {
		id: number;
		email: string;
		firstName: string;
		lastName: string;
		username: string;
		roleId: number;
		createdAt: Date;
		updatedAt: Date;
		lastLogin: Date;
	}

	export interface IEaasiRole {
		id: number;
		roleName: string;
		roleDescription: string;
		createdAt: Date;
		updatedAt: Date;
	}

}