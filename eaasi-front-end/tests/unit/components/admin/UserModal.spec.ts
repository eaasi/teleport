import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from '@/store/admin-store';
import globalStore from '@/store/global-store';
import {FormModal} from '@/components/forms';
import UserModal from '@/components/admin/users/UserModal.vue';
import { generateFakeUsers } from '../../generators';
import { makeAdminStoreState } from '../../store-helpers';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('UserModal.vue', () => {
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

	it('Renders a FormModal', () => {
		let fakeUser= generateFakeUsers(1)[0];
		const wrapper = shallowMount(UserModal, {
			localVue,
			propsData: {
				user: fakeUser
			},
			store
		});
		expect(wrapper.find(FormModal).exists()).toBe(true);
	});
});
