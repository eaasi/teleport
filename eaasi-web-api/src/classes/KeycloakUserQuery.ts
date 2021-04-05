import KeycloakQuery from '@/classes/KeycloakQuery';
import CrudQuery from '@/classes/CrudQuery';

const USERS_LIMIT = 50;

export default class KeycloakUserQuery extends KeycloakQuery {
	briefRepresentation?: boolean;
	email?: string;
	first?: number;
	firstName?: string;
	lastName?: string;
	max?: number;
	search?: string;
	username?: string;

	constructor(query?: CrudQuery) {
	    super();
		this.briefRepresentation = false;
	    if (query) {
	        this.max = query.limit || USERS_LIMIT;
	        this.first =  query.page ? this.max * (query.page - 1) : 0;
		} else {
			this.max = USERS_LIMIT;
		}
	}
}