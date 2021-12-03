export interface INewUser {
	enabled?: boolean;
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	attributes?: {
		role: string[];
	};
	credentials?: object[];
}

export interface INewGroup {
	name: string;
	attributes: {
		tid: string[];
		orgname: string[];
	};
}
