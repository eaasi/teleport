import { shallowMount } from '@vue/test-utils';
import { TextInput } from '@/components/forms';

describe('TextInput.vue', () => {
	it('Renders an input field', () => {
		const wrapper = shallowMount(TextInput, {
			propsData: {
				value: 'good morning'
			},
		});
		expect(wrapper.find('input').exists()).toBe(true);
	});
});
