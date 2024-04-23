import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { BigButton } from '@/components/global';

enableAutoDestroy(afterEach);

describe('BigButton.vue', () => {
	it('Renders label prop as button text', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'foo',
			},
		});
		expect(wrapper.find('label').text()).toBe('foo');
	});

	it('When passed block prop as true applies block class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'halt and catch fire',
				block: true,
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('block');
	});

	it('When passed block prop as false sets no block class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'halt and catch fire',
				block: false,
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).not.toContain('block');
	});


	it('When passed size prop as sm sets size-sm class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'abbey road',
				size: 'sm'
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('size-sm');
	});

	it('When passed size prop as small sets size-small class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'abbey road',
				size: 'small'
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('size-small');
	});

	it('When passed size prop as sm sets size-lg class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'the white album',
				size: 'lg'
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('size-lg');
	});

	it('When passed size prop as large sets size-large class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'kobe bryant',
				size: 'large'
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('size-large');
	});

	it('When passed no size prop sets size-small class', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'shaq',
			},
		});
		expect(wrapper.find('.eb-wrapper').classes()).toContain('size-sm');
	});

	it('Renders subLabel prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'bar',
				subLabel: 'baz bang'
			},
		});
		expect(wrapper.find('.eb-sublabel').text()).toBe('baz bang');
	});

	it('Renders info prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'quux',
				subLabel: 'etc etc',
				info: 'artificial intelligence'
			},
		});
		expect(wrapper.find('.eb-info').text()).toBe('artificial intelligence');
	});

	it('Renders icon prop', () => {
		const wrapper = shallowMount(BigButton, {
			propsData: {
				label: 'quux',
				subLabel: 'etc etc',
				info: 'random forest',
				icon: 'tree'
			},
		});
		expect(wrapper.find('.fa-tree').exists()).toBe(true);
	});
});
