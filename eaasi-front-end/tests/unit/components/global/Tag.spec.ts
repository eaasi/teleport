import { shallowMount } from '@vue/test-utils';
import { Tag } from '@/components/global';
import {translatedIcon} from '@/utils/constants';

describe('Tag.vue', () => {
	it('Renders text passed as prop', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: translatedIcon('file'),
				color: 'blue'
			},
		});
		expect(wrapper.find('.tag-text').text()).toBe('hello');
	});

	it('Does not render icon when no icon prop is passed', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: undefined,
				color: 'yellow'
			},
		});
		expect(wrapper.find('.icon').element.innerText).toBeUndefined();
	});
});
