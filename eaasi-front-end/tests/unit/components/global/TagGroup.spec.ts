import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import {Tag, TagGroup} from '@/components/global';
import faker from 'faker';

function generateTags(tagCount) {
	const tags = [];
	for (let i=0; i<tagCount; i++) {
		tags.push(
			{
				text: faker.random.words(1)
			}
		);
	}
	return tags;
}

enableAutoDestroy(afterEach);

describe('TagGroup.vue', () => {
	it('Renders three tags when passed as props', () => {
		const wrapper = shallowMount(TagGroup, {
			propsData: {
				tags: [
					{ text: 'foo' },
					{ text: 'bar' },
					{ text: 'baz' }
				]
			},
		});
		expect(wrapper.findAll(Tag)).toHaveLength(3);
	});

	it('Renders one hundred tags when passed as props', () => {
		const wrapper = shallowMount(TagGroup, {
			propsData: {
				tags: generateTags(100)
			},
		});
		expect(wrapper.findAll(Tag)).toHaveLength(100);
	});
});
