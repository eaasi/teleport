import { shallowMount } from '@vue/test-utils';
import { HoverMenu } from '@/components/global';

describe('HoverMenu.vue', () => {
	it('Has invisible menu slot if no mouseenter event is triggered', () => {
		const wrapper = shallowMount(HoverMenu, {
			propsData: {
				closeDelay: 500
			},
			slots: {
				menu: 'fake menu item'
			}
		});
		const menuWrapperText = wrapper.find('.hover-menu-wrapper').text();
		expect(menuWrapperText).toBeFalsy();
	});

	it('On mouse enter event makes menu slot visible', () => {
		const wrapper = shallowMount(HoverMenu, {
			propsData: {
				closeDelay: 500
			},
			slots: {
				menu: 'fake menu item'
			}
		});

		// Trigger the mouse enter event
		wrapper.find('.hover-menu-wrapper').trigger('mouseenter');
		wrapper.vm.$nextTick(() => {
			expect(wrapper.emitted('opened')).toBeTruthy();
		});
	});
});
