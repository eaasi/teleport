import UserList from '@/components/admin/users/UserList.vue';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import adminStore from '@/store/admin-store';
import globalStore from '@/store/global-store';
import { userRoles } from '@/utils/constants';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import { makeAdminStoreState } from '../../store-helpers';

const localVue = createLocalVue();

localVue.use(Vuex);

const $colors = {
	'lightNeutral': '#bbb'
};

describe('UserManagement.vue', () => {
	let store;
	let getters;

	beforeEach(() => {
		// Note: this is testing as if a user is admin (role 1)
		let permissionResolver = new PermissionResolver(userRoles.ADMIN);

		let localAdminStore = adminStore;

		getters = {
			permissions: () => permissionResolver,
		};

		localAdminStore.state = makeAdminStoreState(10);

		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				admin: localAdminStore,
				// @ts-ignore
				global: globalStore
			},
			plugins: [pathify.plugin],
			getters
		});
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
