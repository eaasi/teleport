import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminMenuItem from '@/components/admin/AdminMenuItem.vue';
import PermissionResolver from '@/services/Permissions/PermissionResolver';
import localAdminStore from '../../store/fake-admin-store';
import globalStore from '@/store/global-store';
import { userRoles } from '@/utils/constants';
import { createLocalVue, enableAutoDestroy, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';

const localVue = createLocalVue();
localVue.use(Vuex);

enableAutoDestroy(afterEach);

describe('AdminMenu.vue', () => {
	let store;
	let mutations;
	let getters;

	beforeEach(() => {
		// Note: this is testing as if a user is admin (role 1)
		const permissionResolver = new PermissionResolver(userRoles.ADMIN);

		getters = {
			permissions: () => permissionResolver,
		};

		mutations = {
			SET_ACTIVE_USER: jest.fn()
		};

		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				admin: localAdminStore,
				// @ts-ignore
				global: globalStore
			},
			state: {
				appVersion: '',
				loggedInUser: {'id': 123}
			},
			plugins: [pathify.plugin],
			getters
		});
	});

	it('Displays all menu items', () => {
		const wrapper = shallowMount(AdminMenu, { store, localVue });
		const userMenuItems = (wrapper.vm as any).userMenuItems;
		const menuItems = (wrapper.vm as any).menuItems;
		const allItems = userMenuItems.concat(menuItems);
		expect(wrapper.findAll(AdminMenuItem).length).toBe(allItems.length);
	});

	it('Contains Node Management section', () => {
		const wrapper = shallowMount(AdminMenu, { store, localVue });
		expect(wrapper.contains('Node Management'));
	});

	it('Contains Node User Administration section', () => {
		const wrapper = shallowMount(AdminMenu, { store, localVue });
		expect(wrapper.contains('Node User Administration'));
	});
});
