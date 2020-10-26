import UserList from '@/components/admin/users/UserList.vue';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import adminStore from '@/store/admin-store';
import { userRoles } from '@/utils/constants';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import { generateFakeUsers } from '../../generators';


const localVue = createLocalVue();

localVue.use(Vuex);

describe('UserList.vue', () => {

	let store;
	let state;
	let actions;
	let getters;

	beforeEach(() => {
		// Note: this is testing as if a user is admin (role 1)
		let permissionResolver = new PermissionResolver(userRoles.ADMIN);

		let stateForAdminStore = {
			activeUser: { id: 99999 },
			usersQuery: {},
			roles: [],
		};

		getters = {
			permissions: () => permissionResolver,
		};

		let stateForGlobalStore = {
			loggedInUser : { id: 99999 },
		};

		actions = { };

		store = new Vuex.Store({
			state: stateForGlobalStore,
			modules: {
				// @ts-ignore
				admin: {
					...adminStore,
					state: stateForAdminStore,
				},
			},
			plugins: [pathify.plugin],
			getters
		});
	});

	it('Displays all Users passed as props in table rows', () => {
		const fakeUsers = generateFakeUsers(3);
		const wrapper = shallowMount(UserList, {
			localVue,
			propsData: {
				users: fakeUsers
			},
			store
		});
		expect(wrapper.findAll('tbody>tr').length).toBe(fakeUsers.length);
	});
});
