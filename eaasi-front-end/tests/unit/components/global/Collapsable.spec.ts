import { shallowMount } from '@vue/test-utils';
import { Collapsable } from '@/components/global';

describe('Collapsable.vue', () => {
	it('Does not show slot content when closed', () => {
		const wrapper = shallowMount(Collapsable, {
			slots: {
				default: '<div class="slot-content">I am the content></div>'
			}
		});
		expect(wrapper.contains('.slot-content')).toBeFalsy();
	});

	it('Opens and displays slot content when title is clicked', () => {
		const wrapper = shallowMount(Collapsable, {
			slots: {
				default: '<div class="slot-content">I am the content></div>'
			}
		});
		wrapper.find('.collapse-title').trigger('click');
		expect(wrapper.contains('.slot-content')).toBe(true);
	});

	it('Displays the correct title based on open state', () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				title: 'I am not open',
				openTitle: 'I am open'
			}
		});
		let menuWrapperText = wrapper.find('.collapse-title').text();
		expect(menuWrapperText).toBe('I am not open');
		wrapper.find('.collapse-title').trigger('click');
		menuWrapperText = wrapper.find('.collapse-title').text();
		expect(menuWrapperText).toBe('I am open');
	});
});
