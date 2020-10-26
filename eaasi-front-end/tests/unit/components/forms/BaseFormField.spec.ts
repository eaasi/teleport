import { shallowMount } from '@vue/test-utils';
import { BaseFormField } from '@/components/global/forms';

describe('BaseFormField.vue', () => {
	it('Has canValidate data with false by default', () => {
		const wrapper = shallowMount(BaseFormField, {
			propsData: {
				hideLabel: false,
				label: 'Test Form',
				rules: () => true,
				value: 'foo@bar.baz'
			},
		});
		expect(wrapper.vm.$data.canValidate).toBe(false);
	});
});
