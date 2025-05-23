import UserModal from '@/components/admin/users/UserModal.vue';
import { FormModal } from '@/components/global/forms';
import adminStore from '../../store/fake-admin-store';
import globalStore from '@/store/global-store';
import { createLocalVue, enableAutoDestroy, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import { generateFakeUsers } from '../../generators';
import { makeAdminStoreState } from '../../store-helpers';
import GlobalComponents from '@/components/global';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(GlobalComponents);

enableAutoDestroy(afterEach);

describe('UserModal.vue', () => {
	let store;
	beforeEach(() => {
		const localAdminStore = adminStore;
		localAdminStore.state = makeAdminStoreState(10);
		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				admin: localAdminStore,
				// @ts-ignore
				global: globalStore
			},
			state: {
				loggedInUser: {'id': 123}
			},
			plugins: [pathify.plugin]
		});
	});

	it('Renders a FormModal', () => {
		const fakeUser= generateFakeUsers(1)[0];
		const wrapper = mount(UserModal, {
			localVue,
			propsData: {
				user: fakeUser
			},
			store
		});
		expect(wrapper.findComponent(FormModal).exists()).toBe(true);
	});

	it('Shows "Delete user" button for existing users', () => {
		const fakeUser = generateFakeUsers(1)[0];
		const wrapper = mount(UserModal, {
			localVue,
			propsData: {
				user: fakeUser
			},
			store
		});
		expect(wrapper.find('.bottom-btn-wrapper').exists()).toBe(true);
	});

	it('Hides "Delete user" button for new users', () => {
		const fakeUser = generateFakeUsers(1)[0];
		const wrapper = mount(UserModal, {
			localVue,
			propsData: {
				user: {...fakeUser, id: null }
			},
			store
		});
		expect(wrapper.find('.bottom-btn-wrapper').exists()).toBe(false);
	});

});
