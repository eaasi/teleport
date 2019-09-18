import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from '@/store/admin-store';
import globalStore from '@/store/global-store';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import UserList from '@/components/admin/users/UserList.vue';
import {Pagination} from '@/components/global';
import { makeAdminStoreState } from '../../store-helpers';

const localVue = createLocalVue();

localVue.use(Vuex);

const $colors = {
	'lightNeutral': '#bbb'
};

describe('UserManagement.vue', () => {
	let store;

	beforeEach(() => {
		let localAdminStore = adminStore;

		localAdminStore.state = makeAdminStoreState(10);

		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				admin: localAdminStore,
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin]
		});
	});

	it('Provides Pagination', () => {
		const wrapper = mount(UserManagement, {
			mocks: {$colors},
			localVue,
			propsData: {
				showCreateModal: false
			},
			store
		});

		expect(wrapper.find(Pagination).exists()).toBe(true);
	});

	it('Renders a List of Users', () => {
		const wrapper = mount(UserManagement, {
			mocks: {$colors},
			localVue,
			propsData: {
				showCreateModal: false,
			},
			store
		});

		expect(wrapper.find(UserList).exists()).toBe(true);
	});
});
