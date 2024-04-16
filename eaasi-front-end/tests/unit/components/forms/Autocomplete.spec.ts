import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import {Autocomplete } from '@/components/global/forms';

enableAutoDestroy(afterEach);

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
				]
			},
		});
		wrapper.vm.$data.listVisible = true;
		expect(wrapper.find('.ac-list').exists()).toBe(true);
	});
});
