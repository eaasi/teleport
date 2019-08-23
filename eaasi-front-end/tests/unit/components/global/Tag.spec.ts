import { shallowMount } from '@vue/test-utils';
import { Tag } from '@/components/global';

describe('Tag.vue', () => {
	it('Renders text passed as prop', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: 'fa-file',
				color: 'blue'
			},
		});
		expect(wrapper.find('.tag-text').text()).toBe('hello');
	});

	it('Renders icon passed as prop', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: 'fa-file',
				color: 'blue'
			},
		});
		expect(wrapper.find('.tag-icon').contains('.fa-file')).toBe(true);
	});
	it('Does not render icon when no icon prop is passed', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: undefined,
				color: 'yellow'
			},
		});
		expect(wrapper.find('.tag-icon').exists()).toBe(false);
	});
});
