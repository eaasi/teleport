import { mount } from '@vue/test-utils';
import LabeledItemList from '@/components/global/LabeledItem/LabeledItemList.vue';

describe('LabeledItemList', () => {
	it('Displays list of LabeledItems passed as prop', () => {
		const wrapper = mount(LabeledItemList, {
			propsData: {
				labeledItems: [
					{
						label: 'foo',
						value: 'once upon a time'
					},
					{
						label: 'bar',
						value: 'lorem ipsum'
					},
					{
						label: 'baz',
						value: 'solar panel'
					},
				]
			},
		});
		const allLabels = wrapper.find('.lil-container').findAll('.li-container');
		expect(allLabels).toHaveLength(3);
	});
});
