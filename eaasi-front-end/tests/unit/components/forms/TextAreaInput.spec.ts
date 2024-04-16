import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { TextAreaInput } from '@/components/global/forms';

enableAutoDestroy(afterEach);

describe('TextAreaInput.vue', () => {

	it('Renders correct number of rows passed as props', () => {
		const wrapper = shallowMount(TextAreaInput, {
			propsData: {
				value: 'Lorem ipsum dolor',
				rows: 18
			},
		});
		const renderedRows = wrapper.find('textarea').attributes().rows;
		expect(renderedRows).toBe('18');
	});
});
