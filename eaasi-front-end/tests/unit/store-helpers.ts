import {generateFakeUsers} from './generators';

/**
 * Provides stub userStore object for use in unit tests.
 * Current version provides parameter for number of users to generate;
 * Add additional parameters and modify as needed.
 * @param numUsers
 */
export function makeUserStoreState(numUsers) {
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
			count: numUsers,
			totalPages: 2,
			result: generateFakeUsers(numUsers)
		}
	};

}
