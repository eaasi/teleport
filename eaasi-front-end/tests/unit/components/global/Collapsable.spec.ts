import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { Collapsable } from '@/components/global';

enableAutoDestroy(afterEach);

describe('Collapsable.vue', () => {
	it('Does not show slot content when closed', () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				collapsed: true,
				title: 'Alrighty'
			},
			slots: {
				default: '<div class="slot-content">I am the content</div>'
			}
		});
		expect(wrapper.contains('.slot-content')).toBeFalsy();
	});

	it('Opens and displays slot content when title is clicked', async () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				collapsed: true,
				title: 'Alrighty'
			},
			slots: {
				default: '<div class="slot-content">I am the content</div>'
			}
		});
		await wrapper.find('.collapse-title').trigger('click');
		expect(wrapper.contains('.slot-content')).toBe(true);
	});

	it('Displays the correct title based on open state', async () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				title: 'I am not open',
				openTitle: 'I am open',
				collapsed: true
			}
		});
		let menuWrapperText = wrapper.find('.collapse-title').text();
		expect(menuWrapperText).toBe('I am not open');
		await wrapper.find('.collapse-title').trigger('click');
		menuWrapperText = wrapper.find('.collapse-title').text();
		expect(menuWrapperText).toBe('I am open');
	});

	it('Renders title prop', () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				collapsed: true,
				title: 'Michael Jordan'
			},
			slots: {
				default: '<div class="slot-content">I am the content</div>'
			}
		});
		expect(wrapper.find('.collapsable-active-title').text())
			.toBe('Michael Jordan');
	});

	it('Renders icon when collapsed as fa-chevron-down', () => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				collapsed: true,
				title: 'something',
				icon: 'moon'
			},
			slots: {
				default: '<div class="slot-content">I am the content</div>'
			}
		});
		expect(wrapper.find('.fas').classes()).toContain('fa-chevron-down');
	});

	it('Renders icon when opened as fa-chevron-up', async() => {
		const wrapper = shallowMount(Collapsable, {
			propsData: {
				title: 'I am not open',
				openTitle: 'I am open',
				collapsed: true
			}
		});
		let menuWrapperText = wrapper.find('.collapse-title').text();
		await wrapper.find('.collapse-title').trigger('click');
		menuWrapperText = wrapper.find('.collapse-title').text();
		expect(wrapper.find('.fas').classes()).toContain('fa-chevron-up');
	});
});
