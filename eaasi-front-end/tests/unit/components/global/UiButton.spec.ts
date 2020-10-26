import { shallowMount } from '@vue/test-utils';
import { UiButton } from '@/components/global';

describe('UiButton.vue', () => {
	it('Renders button text passed into slot', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				colorPreset: 'light-blue',
				icon: 'file',
				iconRight: ''
			},
			slots: {
				default: 'submit!'
			}
		});
		expect(wrapper.find('button').text()).toBe('submit!');
	});

	it('Renders icon passed as props', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				colorPreset: 'light-blue',
				icon: 'whatever',
				iconRight: ''
			},
			slots: {
				default: 'submit!'
			}
		});
		expect(wrapper.find('.fa-whatever').exists()).toBeTruthy();
	});

	it('Renders icon with right side version when iconRight True passed as props', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				colorPreset: 'light-blue',
				icon: 'whatever',
				iconRight: true
			},
			slots: {
				default: '<div>its all good</div>'
			}
		});
		expect(wrapper.find('.eb-icon-right').exists()).toBeTruthy();
	});

	it('Renders colorPreset class when passed as props', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				colorPreset: 'light-blue',
				icon: 'bread',
				iconRight: true
			},
			slots: {
				default: '<div>its all good</div>'
			}
		});
		expect(wrapper.find('.light-blue').exists()).toBeTruthy();
	});

	it('Renders block class when passed as props', () => {
		const wrapper = shallowMount(UiButton, {
			propsData: {
				block: true,
				icon: 'bread',
				iconRight: false,
			},
			slots: {
				default: '<div>its all good</div>'
			}
		});
		expect(wrapper.find('.block').exists()).toBeTruthy();
	});
});
