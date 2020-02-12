import PermissionResolver from '@/services/Permissions/PermissionResolver';
import {userRoles} from '@/utils/constants';
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminMenuItem from '@/components/admin/AdminMenuItem.vue';
import pathify from 'vuex-pathify';
import globalStore from '@/store/global-store';
import localAdminStore from '@/store/admin-store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AdminMenu.vue', () => {
	let store;
	let mutations;
	let getters;

	beforeEach(() => {
		// Note: this is testing as if a user is admin (role 1)
		let permissionResolver = new PermissionResolver(userRoles.ADMIN);

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
		const userMenuItems = wrapper.vm.$data['userMenuItems'];
		const menuItems = wrapper.vm.$data['menuItems'];
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
