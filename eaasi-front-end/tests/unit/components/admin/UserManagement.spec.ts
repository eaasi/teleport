import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import userStore from '@/store/user-store';
import globalStore from '@/store/global-store';
import UserManagement from '@/components/admin/UserManagement.vue';
import UserList from '@/components/admin/UserList.vue';
import {Pagination} from '@/components/global';
import { makeUserStoreState } from '../../store-helpers';

const localVue = createLocalVue();

localVue.use(Vuex);

const $colors = {
	'lightNeutral': '#bbb'
};

describe('UserManagement.vue', () => {
	let store;

	beforeEach(() => {
		let localUserStore = userStore;

		localUserStore.state = makeUserStoreState(10);

		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				users: localUserStore,
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin]
		});
	});

	it('Provides Pagination', () => {
		const wrapper = shallowMount(UserManagement, {
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
		const wrapper = shallowMount(UserManagement, {
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
