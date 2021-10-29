import { shallowMount } from '@vue/test-utils';
import LabeledItem from '@/components/global/LabeledItem/LabeledItem.vue';

describe('LabeledItem', () => {
	it('Displays label passed as prop', () => {
		const wrapper = shallowMount(LabeledItem, {
			propsData: {
				labeledItem: {
					label: 'foo',
					value: 'bar baz quux'
				}
			},
		});
		const labelText = wrapper.find('.li-label').text();
		expect(labelText).toBe('foo');
	});

	it('Displays value passed as prop', () => {
		const wrapper = shallowMount(LabeledItem, {
			propsData: {
				labeledItem: {
					label: 'cray',
					value: 'something else'
				}
			},
		});
		const labelValue = wrapper.find('.li-value').text();
		expect(labelValue).toBe('something else');
	});
});
