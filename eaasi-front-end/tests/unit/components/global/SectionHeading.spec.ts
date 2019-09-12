import { shallowMount } from '@vue/test-utils';
import { SectionHeading } from '@/components/global';

describe('SectionHeading.vue', () => {
	it('Renders prop title as heading text', () => {
		const wrapper = shallowMount(SectionHeading, {
			propsData: {
				title: 'alrighty'
			},
		});
		expect(wrapper.find('.heading-text').text()).toBe('alrighty');
	});

	it('Renders icon passed as prop', () => {
		const wrapper = shallowMount(SectionHeading, {
			propsData: {
				title: 'welcome to',
				icon: 'delaware'
			},
		});
		expect(wrapper.find('.delaware').exists()).toBe(true);
	});
});
