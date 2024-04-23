import AppliedSearchFacets from '@/components/resources/search/AppliedSearchFacets.vue';
import {createLocalVue, enableAutoDestroy, shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import pathify from 'vuex-pathify';
import resourceStore from '@/store/resource-store';


const localVue = createLocalVue();
localVue.use(Vuex);

enableAutoDestroy(afterEach);

describe('AppliedSearchFacets.vue', () => {

	let store;

	resourceStore.state.query.selectedFacets = [
		{
			displayLabel: 'foo',
			name: 'caro',
			values: [{ label: 'abc', total: 19, isSelected: true }]
		}, {
			displayLabel: 'bar',
			name: 'kann',
			values: [{ label: 'def', total: 1, isSelected: true }]
		},
	];

	beforeEach(() => {
		store = new Vuex.Store({
			modules: {
				// @ts-ignore
				resource: resourceStore
			},
			state: {
				query: {
					selectedFacets: ['hello', 'world']
				},
				isSingleResult: false
			},
			plugins: [pathify.plugin]
		});
	});

	it('renders correct number of selectedFacets using resource store', () => {
		const wrapper = shallowMount(AppliedSearchFacets, {
			localVue,
			store
		});
		const numFacets = wrapper.findAll('.active-facet').length;
		expect(numFacets).toBe(2);
	});
});

