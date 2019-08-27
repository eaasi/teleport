import {createLocalVue, shallowMount} from '@vue/test-utils';
import UserList from '@/components/admin/UserList.vue';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import userStore from '@/store/user-store';
import {generateFakeUsers} from '../../generators';


const localVue = createLocalVue();

localVue.use(Vuex);

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
