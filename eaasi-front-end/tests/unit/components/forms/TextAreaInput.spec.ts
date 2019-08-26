import { shallowMount } from '@vue/test-utils';
import { TextAreaInput } from '@/components/forms';

describe('TextAreaInput.vue', () => {

	it('Renders correct number of rows passed as props', () => {
		const wrapper = shallowMount(TextAreaInput, {
			propsData: {
				value: 'Lorem ipsum dolor',
				rows: 18
			},
		});
		let renderedRows = wrapper.find('textarea').attributes().rows;
		expect(renderedRows).toBe('18');
	});
});
