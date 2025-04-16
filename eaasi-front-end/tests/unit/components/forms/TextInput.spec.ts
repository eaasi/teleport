import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { TextInput } from '@/components/global/forms';

enableAutoDestroy(afterEach);

describe('TextInput.vue', () => {
	it('Renders an input field', () => {
		const wrapper = shallowMount(TextInput, {
			propsData: {
				value: 'good morning'
			},
		});
		expect(wrapper.find('input').exists()).toBe(true);
	});

	it('Displays a label when label passed as prop and not hidden', () => {
		const wrapper = shallowMount(TextInput, {
			propsData: {
				hideLabel: false,
				label: 'good stuff',
				value: 'good stuff'
			},
		});

		expect(wrapper.find('.eaasi-label')
			.text())
			.toContain('good stuff');
	});

	it('Hides a label when label passed as prop and hidden is true', () => {
		const wrapper = shallowMount(TextInput, {
			propsData: {
				hideLabel: true,
				label: 'good stuff',
				value: 'good stuff'
			},
		});

		expect(wrapper.find('.eaasi-label')
			.exists())
			.toBe(false);
	});

});
