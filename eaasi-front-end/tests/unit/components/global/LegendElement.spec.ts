import { shallowMount } from '@vue/test-utils';
import LegendElement from '@/components/global/LegendElement.vue';

describe('LegendElement.vue', () => {
	it('Renders text passed as prop', () => {
		const wrapper = shallowMount(LegendElement, {
			propsData: {
				data: {
					text: 'I Am Legend starring Will Smith',
					color: 'yellow'
				}
			},
		});
		expect(wrapper.find('.legend-text').text()).toBe('I Am Legend starring Will Smith');
	});

	it('Appends a class name of the color passed as prop', () => {
		const wrapper = shallowMount(LegendElement, {
			propsData: {
				data: {
                    text: 'Legend of Zelda',
                    color: 'green'
				}
			},
		});
		expect(wrapper.find('.green').exists()).toBe(true);
	});
});
