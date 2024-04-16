import resourceStore from '@/store/resource-store';
import {createLocalVue, enableAutoDestroy, shallowMount} from '@vue/test-utils';
import { SearchBar } from '@/components/global/forms';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';

const localVue = createLocalVue();
localVue.use(Vuex);

enableAutoDestroy(afterEach);

describe('SearchBar.vue', () => {
	let store;
	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				resource: resourceStore
			},
			state: {
				query: {
					keyword: ''
				},
				lastSearchKeyword: ''
			},
			plugins: [pathify.plugin]
		});
	});
	it('Emits search when triggered by click event on eaasi-field-icon', () => {
		const wrapper = shallowMount(SearchBar, {
			localVue,
			store,
			propsData: {
				value: 'howdy'
			},
		});
		wrapper.find('.eaasi-field-icon').trigger('click');
		expect(wrapper.emitted('search')).toBeTruthy();
	});
});
