import {generateFakeUsers} from './generators';
import { AdminState } from '@/store/admin-store';

/**
 * Provides stub adminStore object for use in unit tests.
 * Current version provides parameter for number of users to generate;
 * Add additional parameters and modify as needed.
 * @param numUsers
 */
export function makeAdminStoreState(numUsers) : AdminState {
	let state = new AdminState();
	return {
		...state,
		usersQuery: {
			page: 1,
			limit: 2,
			keyword: 'foo',
			sortCol: undefined,
			descending: false,
		},
		usersResult: {
			totalResults: numUsers,
			result: generateFakeUsers(numUsers)
		}
	};

}
