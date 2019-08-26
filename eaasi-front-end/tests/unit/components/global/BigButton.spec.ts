import { shallowMount } from '@vue/test-utils';
import { BigButton } from '@/components/global';

describe('BigButton.vue', () => {
	it('Renders data found', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'foo',
				sublabel: 'bar'
			},
		});
		expect(wrapper.find);
	});
});
