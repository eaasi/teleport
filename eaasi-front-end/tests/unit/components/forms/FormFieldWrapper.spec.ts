import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import FormFieldWrapper from '@/components/global/forms/FormFieldWrapper.vue';

enableAutoDestroy(afterEach);

describe('FormFieldWrapper.vue', () => {

	it('Displays an error message when error passed as prop', () => {
		const wrapper = shallowMount(FormFieldWrapper, {
			propsData: {
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
				error: undefined,
				required: false
			},
		});

		expect(wrapper.find('.error')
			.exists())
			.toBe(false);
	});
});
