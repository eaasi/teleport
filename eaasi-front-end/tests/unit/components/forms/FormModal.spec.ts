import { shallowMount } from '@vue/test-utils';
import { FormModal } from '@/components/forms';

// TODO: Test button click emissions

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
