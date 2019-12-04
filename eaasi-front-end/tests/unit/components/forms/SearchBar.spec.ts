import { shallowMount } from '@vue/test-utils';
import { SearchBar } from '@/components/global/forms';

describe('SearchBar.vue', () => {
	it('Emits search when triggered by click event on eaasi-field-icon', () => {
		const wrapper = shallowMount(SearchBar, {
			propsData: {
				value: 'foo'
			},
		});
		wrapper.find('.eaasi-field-icon').trigger('click');
		expect(wrapper.emitted('search')).toBeTruthy();
	});
});
