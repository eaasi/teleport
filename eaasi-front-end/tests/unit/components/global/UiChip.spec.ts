import { shallowMount } from '@vue/test-utils';
import { UiChip } from '@/components/global';

describe('UiChip.vue', () => {
	it('Renders chip text passed into slot', () => {
		const wrapper = shallowMount(UiChip, {
			slots: {
				default: 'Default!'
			}
		});
		expect(wrapper.find('.ui-chip-content').text()).toBe('Default!');
	});

	it('Renders close icon if passed', () => {
		const wrapper = shallowMount(UiChip, {
			propsData: {
				close: true
			},
			slots: {
				default: 'Remove Attribute'
			}
		});
		expect(wrapper.find('.fa-times').exists()).toBeTruthy();
	});
});
