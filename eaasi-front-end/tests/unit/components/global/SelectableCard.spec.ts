import { SelectableCard } from '@/components/global';
import { shallowMount } from '@vue/test-utils';

describe('SelectableCard.vue', () => {
	it('Renders a title', () => {
		const wrapper = shallowMount(SelectableCard, {
			propsData: {
				data: {
					title: 'foo'
				},
			},
		});
		expect(wrapper.find('.header').text()).toBe('foo');
	});
});
