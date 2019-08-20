import {createLocalVue, shallowMount} from '@vue/test-utils';
import UserList from '@/components/admin/UserList.vue';
import User from '@/models/auth/User';
import Vuex, {Module} from 'vuex';
import pathify from 'vuex-pathify';
import userStore from '@/store/user-store';

import faker from 'faker';

const localVue = createLocalVue();

localVue.use(Vuex);

function generateFakeUsers(userCount: number) : User[] {
	let users = [];
	for (let i = 1; i <= userCount; i++) {
		users.push({
			id: faker.random.number(),
			firstName: faker.name.firstName(),
			username: faker.hacker.adjective() + '_' + faker.hacker.noun(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			lastLogin: faker.date.recent()
		});
	}
	return users;
}

describe('AdminMenu.vue', () => {
	let store;


	beforeEach(() => {
		store = new Vuex.Store({
			actions: {},
			modules: {
				// @ts-ignore
				users: userStore
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
