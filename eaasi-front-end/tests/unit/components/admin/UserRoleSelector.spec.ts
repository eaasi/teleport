import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import userStore from '@/store/user-store';
import globalStore from '@/store/global-store';
import { generateFakeRole } from '../../generators';
import { makeUserStoreState } from '../../store-helpers';
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
				role: generateFakeRole(),
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
				role: generateFakeRole(),
				value: 1
			},
			store
		});
		expect(wrapper.find('p').text()).toBe(wrapper.vm.$props.role.roleDescription);
	});
});
