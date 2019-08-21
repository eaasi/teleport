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
});
