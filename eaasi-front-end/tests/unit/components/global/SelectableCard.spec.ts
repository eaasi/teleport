import { SelectableCard } from '@/components/global';
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';

enableAutoDestroy(afterEach);

describe('SelectableCard.vue', () => {
	it('Renders a title', () => {
		const wrapper = shallowMount(SelectableCard, {
			propsData: {
				value: false,
				data: {
					title: 'foo'
				},
			},
		});
		expect(wrapper.find('.header').text()).toBe('foo');
	});
});
