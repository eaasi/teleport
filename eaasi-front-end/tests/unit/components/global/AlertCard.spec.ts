import { mount } from '@vue/test-utils';
import { AlertCard } from '@/components/global';

describe('AlertCard.vue', () => {
	it('Error alert card shows triangle warning icon', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'red',
				type: 'error'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Warning alert card shows triangle warning icon', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'orange',
				type: 'warning'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Success alert card shows check circle icon', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'green',
				type: 'success'
			},
		});
		expect(wrapper.find('.fa-check-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
	});

	it('Info alert card shows info circle icon', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'blue',
				type: 'info'
			},
		});
		expect(wrapper.find('.fa-info-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Can be transparent', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'transparent',
				type: 'info'
			},
		});
		expect(wrapper.find('.fa-info-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Renders text in slot', () => {
		const wrapper = mount(AlertCard, {
			propsData: {
				color: 'blue',
				type: 'info'
			},
			slots: {
				default: 'crucial information'
			}
		});
		expect(wrapper.find('.content').text())
			.toBe('crucial information');
	});
});
