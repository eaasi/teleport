import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import adminStore from '@/store/admin-store';
import globalStore from '@/store/global-store';
import { makeAdminStoreState } from '../../store-helpers';
import DescriptiveSelector from '@/components/global/forms/DescriptiveSelector.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('DescriptiveSelector.vue', () => {
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

	it('Displays Selectable Option name passed as Props', () => {
		const wrapper = shallowMount(DescriptiveSelector, {
			localVue,
			propsData: {
				selectableOption: {title: 'foo', description: 'bar'},
				value: 1
			},
			store
		});
		console.log(wrapper.find('h3').text());
		expect(wrapper.find('h3').text()).toBe('foo');
	});

	it('Displays Role Description passed as Props', () => {
		const wrapper = shallowMount(DescriptiveSelector, {
			localVue,
			propsData: {
				selectableOption: {title: 'foo', description: 'bar'},
				value: 1
			},
			store
		});
		expect(wrapper.find('p').text()).toBe('bar');
	});
});
