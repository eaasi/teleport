import { shallowMount } from '@vue/test-utils';
import { SelectList } from '@/components/forms';

describe('SelectList.vue', () => {
	it('Renders a Select Item passed to slot', () => {
		const wrapper = shallowMount(SelectList, {
			propsData: {
				value: 'foo'
			},
			slots: {
				default: 'foo'
			}
		});
		expect(wrapper.find('select').text()).toBe('foo');
	});
});
