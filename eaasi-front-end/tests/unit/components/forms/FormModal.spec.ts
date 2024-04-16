import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { FormModal } from '@/components/global/forms';

// TODO: Test button click emissions

enableAutoDestroy(afterEach);

describe('FormModal.vue', () => {
	it('Displays title when passed as props', () => {
		const wrapper = shallowMount(FormModal, {
			propsData: {
				title: 'fake modal title',
				saveText: 'save',
				cancelText: 'cancel'
			},
		});
		expect(wrapper.find('h2').text())
			.toBe('fake modal title');
	});
});
