import Vuex from 'vuex';
import {createLocalVue, mount} from '@vue/test-utils';
import {SearchFacetModal} from '@/components/global';


const localVue = createLocalVue();

localVue.use(Vuex);

describe('SearchFacetModal.vue', () => {

	it('Renders facet name', () => {
		const wrapper = mount(SearchFacetModal, {
			localVue,
			propsData: {
				facet: {
					name: 'scheveningen',
					values: [
						{
							 label: 'abc', total: 19, isSelected: true
						}, {
							 label: 'def', total: 1, isSelected: true
						},
					]
				}
			}
		});
		wrapper.vm.$data['attributes'] = [{label: 'chess', facetValues:[]}, {label: 'tournament', facetValues:[1, 2, 3]}];
		const title = wrapper.find('h3').text();
		expect(title).toBe('Filter scheveningen');
	});
});

