import { shallowMount } from '@vue/test-utils';
import { BigSectionHeading } from '@/components/global';

describe('BigSectionHeading.vue', () => {
	it('Renders `title` prop as heading text', () => {
		const wrapper = shallowMount(BigSectionHeading, {
			propsData: {
				title: 'welcome'
			},
		});
		expect(wrapper.find('.big-heading-text').text()).toBe('welcome');
	});

});
