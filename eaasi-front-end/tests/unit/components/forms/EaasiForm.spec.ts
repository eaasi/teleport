import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import {EaasiForm } from '@/components/global/forms';

enableAutoDestroy(afterEach);

describe('EaasiForm.vue', () => {

	it('Has a form role', () => {
		const wrapper = shallowMount(EaasiForm, {});
		expect(wrapper.find('form[role=form]')
			.exists())
			.toBe(true);
	});

	it('Wraps slot for form components', () => {
		const wrapper = shallowMount(EaasiForm, {
			slots: {
				default: '<div class="foo"></div>'
			}
		});
		expect(wrapper.find('div.foo')
			.exists())
			.toBe(true);
	});
});
