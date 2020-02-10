import EaasiSearchQuery from '@/models/http/EaasiSearchQuery';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import UserList from '@/components/admin/users/UserList.vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import globalStore from '@/store/global-store';
import adminStore from '@/store/admin-store';
import {generateFakeUsers} from '../../generators';


const localVue = createLocalVue();

localVue.use(Vuex);

describe('UserList.vue', () => {

	let store;
	let state;
	let actions;

	beforeEach(() => {
		let stateForAdminStore = {
			activeUser: { id: 99999 },
			usersQuery: {},
			roles: [],
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
					state: stateForAdminStore
				},
			},
			plugins: [pathify.plugin]
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
