import { IEaasiUser } from 'eaasi-auth';

export default class User implements IEaasiUser {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	roleId: number = 3;
	createdAt: Date;
	updatedAt: Date;
	lastLogin: Date;
}