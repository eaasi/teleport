export interface INewUser {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	attributes?: {
		role: string[];
	};
	credentials?: object[];
}