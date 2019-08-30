import { shallowMount } from '@vue/test-utils';
import { BigButton } from '@/components/global';

describe('BigButton.vue', () => {
	it('Renders label prop as button text', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'foo',
			},
		});
		expect(wrapper.find('label').text()).toBe('foo');
	});

	it('Renders sublabel prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'bar',
				sublabel: 'baz bang'
			},
		});
		expect(wrapper.find('.eb-sublabel').text()).toBe('baz bang');
	});

	it('Renders info prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'quux',
				sublabel: 'etc etc',
				info: 'artificial intelligence'
			},
		});
		expect(wrapper.find('.eb-info').text()).toBe('artificial intelligence');
	});

	it('Renders icon prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'quux',
				sublabel: 'etc etc',
				info: 'random forest',
				icon: 'tree'
			},
		});
		expect(wrapper.find('.fa-tree').exists()).toBe(true);
	});
});
