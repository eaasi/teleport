import Vuex from 'Vuex';
import {createLocalVue, shallowMount} from '@vue/test-utils';
import pathify from 'vuex-pathify';
import userStore from '@/store/user-store';
import globalStore from '@/store/global-store';
import {FormModal} from '@/components/forms';
import {generateFakeRoles, generateFakeUsers} from '../generators';
import { makeUserStoreState } from '../store-helpers';
import UserRoleSelector from '@/components/admin/UserRoleSelector.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('UserRoleSelector.vue', () => {
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

	it('Displays Role Name passed as Props', () => {
		const wrapper = shallowMount(UserRoleSelector, {
			localVue,
			propsData: {
				role: generateFakeRoles(1)[0],
				value: 1
			},
			store
		});
		expect(wrapper.find('h3').text()).toBe(wrapper.vm.$props.role.roleName);
	});

	it('Displays Role Description passed as Props', () => {
		const wrapper = shallowMount(UserRoleSelector, {
			localVue,
			propsData: {
				role: generateFakeRoles(1)[0],
				value: 1
			},
			store
		});
		expect(wrapper.find('p').text()).toBe(wrapper.vm.$props.role.roleDescription);
	});
});
