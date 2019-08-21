import { shallowMount } from '@vue/test-utils';
import { UiButton } from '@/components/global';

describe('UiButton.vue', () => {
	it('Renders button text passed into slot', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				secondary: false,
				icon: 'file',
				iconRight: ''
			},
			slots: {
				default: 'submit!'
			}
		});
		expect(wrapper.find('button').text()).toBe('submit!');
	});
});
