import { shallowMount } from '@vue/test-utils';
import { SelectableCard } from '@/components/global';

describe('SelectableCard.vue', () => {
	it('Renders a title', () => {
		const wrapper = shallowMount(SelectableCard, {
			propsData: {
				data: {},
			},
		});
		wrapper.vm.$data.title = 'foo';
		expect(wrapper.find('.header').text()).toBe('foo');
	});
});
