import { shallowMount } from '@vue/test-utils';
import {AlertCard } from '@/components/global';

describe('AlertCard.vue', () => {
	it('Error alert card shows triangle warning icon', () => {
		const wrapper = shallowMount(AlertCard, {
			propsData: {
				type: 'error'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Warning alert card shows triangle warning icon', () => {
		const wrapper = shallowMount(AlertCard, {
			propsData: {
				type: 'warning'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Success alert card shows check circle icon', () => {
		const wrapper = shallowMount(AlertCard, {
			propsData: {
				type: 'success'
			},
		});
		expect(wrapper.find('.fa-check-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
	});

	it('Info alert card shows info circle icon', () => {
		const wrapper = shallowMount(AlertCard, {
			propsData: {
				type: 'info'
			},
		});
		expect(wrapper.find('.fa-info-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Renders text in slot', () => {
		const wrapper = shallowMount(AlertCard, {
			propsData: {
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
