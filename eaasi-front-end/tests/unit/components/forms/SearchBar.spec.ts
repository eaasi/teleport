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

	it('Emits search with value of prop value when triggered by click on eaasi-field-icon', () => {
		const wrapper = shallowMount(SearchBar, {
			propsData: {
				value: 'blarney stone'
			},
		});
		wrapper.find('.eaasi-field-icon').trigger('click');
		let emittedWithValue = wrapper.emitted().search[0][0];
		expect(emittedWithValue).toBe('blarney stone');
	});
});
