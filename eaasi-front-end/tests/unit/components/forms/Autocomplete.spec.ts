import { shallowMount } from '@vue/test-utils';
import {Autocomplete, FormModal} from '@/components/forms';

function loadAutoCompleteTestProps(numUsers) {
	return {
		/**
		 * Searched by autocomplete
		 */
		data: [],
		anchor: '',
		clearOnSelect: false,
		value: '',
	};
}

describe('AutoComplete.vue', () => {
	it('If list is visible, renders Searching message', () => {
		const wrapper = shallowMount(Autocomplete, {
			propsData: {
				/**
				 * Searched by autocomplete
				 */
				anchor: 'name',
				value: '',
				data: [
					{id: 12, name: 'Sammy'},
					{id: 430, name: 'Rosa'},
					{id: -9, name: 'Tim'},
				]
			},
		});
		wrapper.vm.$data.listVisible = true;
		expect(wrapper.find('.ac-list').exists()).toBe(true);
	});
});
