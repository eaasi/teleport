export default interface IEaasiUser {
	createdAt?: Date;
	updatedAt?: Date;
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	roleId: number;
	lastLogin: Date;
	token?: string;
}
