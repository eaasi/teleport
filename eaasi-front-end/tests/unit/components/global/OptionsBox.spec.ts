import {enableAutoDestroy, mount, shallowMount} from '@vue/test-utils';
import {BigButton, OptionsBox} from '@/components/global';

enableAutoDestroy(afterEach);

describe('OptionsBox.vue', () => {
	it('Renders header string passed as prop', () => {
		const wrapper = shallowMount(OptionsBox, {
			propsData: {
				header: 'baggins',
			},
		});
		expect(wrapper.find('.ob-header').text()).toBe('baggins');
	});

	it('Renders content passed via default slot', () => {
		const wrapper = shallowMount(OptionsBox, {
			propsData: {
				header: 'baggins',
			},
			slots: {
				default: 'bilbo'
			}
		});
		expect(wrapper.find('.ob-desc').text()).toBe('bilbo');
	});

	it('Renders content passed via footer slot', () => {
		const wrapper = shallowMount(OptionsBox, {
			propsData: {
				header: 'baggins',
			},
			slots: {
				default: 'bilbo',
				footer: 'quux'
			}
		});
		expect(wrapper.find('.ob-footer-content').text()).toBe('quux');
	});

	it('Has footer slot if used', () => {
		const wrapper = mount(OptionsBox, {
			propsData: {
				header: 'baggins',
			},
			slots: {
				default: 'charlie',
				footer: 'charles'
			},
		});

		expect(wrapper.vm.$slots['footer']).toBeTruthy();
	});

	it('Has no footer slot if unused', () => {
		const wrapper = mount(OptionsBox, {
			propsData: {
				header: 'baggins',
				icon: 'bulous',
			},
			slots: {
				default: 'charlie',
			},
		});

		expect(wrapper.vm.$slots['footer']).toBeFalsy();
	});
});
