import {generateFakeUsers} from './generators';
import { UserState } from '@/store/user-store';

/**
 * Provides stub userStore object for use in unit tests.
 * Current version provides parameter for number of users to generate;
 * Add additional parameters and modify as needed.
 * @param numUsers
 */
export function makeUserStoreState(numUsers) : UserState {
	return {
		activeUser: undefined,
		query: {
			page: 1,
			limit: 2,
			keyword: 'foo',
			sortCol: undefined,
			descending: false,
		},

		roles: [],
		usersResult: {
			totalResults: numUsers,
			result: generateFakeUsers(numUsers)
		}
	};

}
