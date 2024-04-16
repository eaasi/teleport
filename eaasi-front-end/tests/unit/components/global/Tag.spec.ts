import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { Tag } from '@/components/global';
import {translatedIcon} from '@/utils/constants';

enableAutoDestroy(afterEach);

describe('Tag.vue', () => {
	it ('Renders text passed as prop', () => {
		const wrapper = shallowMount(Tag, {
			propsData: {
				text: 'hello',
				icon: translatedIcon('file'),
				color: 'blue'
			},
		});
		expect(wrapper.find('.tag-text').text()).toBe('hello');
	});
});
