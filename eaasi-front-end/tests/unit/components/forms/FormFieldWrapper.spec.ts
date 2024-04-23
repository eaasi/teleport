import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import FormFieldWrapper from '@/components/global/forms/FormFieldWrapper.vue';

enableAutoDestroy(afterEach);

describe('FormFieldWrapper.vue', () => {

	it('Displays an error message when error passed as prop', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
				hideLabel: true,
				label: '',
				error: 'uh oh',
				required: false
			},
		});

		expect(wrapper.find('.error')
			.text())
			.toBe('uh oh');
	});

	it('Displays no error message when no error passed as prop', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
				hideLabel: true,
				label: '',
				error: undefined,
				required: false
			},
		});

		expect(wrapper.find('.error')
			.exists())
			.toBe(false);
	});

	it('Displays a label when label passed as prop and not hidden', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
				hideLabel: false,
				label: 'good stuff',
				error: undefined,
				required: false
			},
		});

		expect(wrapper.find('.eaasi-label')
			.text())
			.toContain('good stuff');
	});

	it('Hides a label when label passed as prop and hidden is true', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
				hideLabel: true,
				label: 'good stuff',
				error: undefined,
				required: false
			},
		});

		expect(wrapper.find('.eaasi-label')
			.exists())
			.toBe(false);
	});

	it('Hides a label when no label passed as prop even if hidden is false', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
				hideLabel: false,
				label: undefined,
				error: undefined,
				required: false
			},
		});

		expect(wrapper.find('.eaasi-label')
			.exists())
			.toBe(false);
	});
});
