import { shallowMount } from '@vue/test-utils';
import ErrorModal from '@/components/global/Modal/ErrorModal.vue';

describe('ErrorModal.vue', () => {
	it('Has invisible menu slot if no mouseenter event is triggered', () => {
		const wrapper = shallowMount(ErrorModal, {
			propsData: {
				closeDelay: 500
			},
			slots: {
				menu: 'fake menu item'
			}
		});
		let menuWrapperText = wrapper.find('.hover-menu-wrapper').text();
		expect(menuWrapperText).toBeFalsy();
	});
});
