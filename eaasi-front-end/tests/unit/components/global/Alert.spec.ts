import { shallowMount } from '@vue/test-utils';
import Alert from '@/components/global/Alert/Alert.vue';

describe('Alert.vue', () => {
	it('Displays error icon when type is error', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'error'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Displays info icon when type is info', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'info'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Displays success icon when type is success', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'success'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(true);
	});

	it('Displays warning icon when type is warning', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'warning'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Sets the correct color class based on the type prop', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'error'
			},
		});
		expect(wrapper.classes().indexOf('red') > -1).toBe(true);

		wrapper.setProps({type: 'info'});
		expect(wrapper.classes().indexOf('blue') > -1).toBe(true);

		wrapper.setProps({type: 'warning'});
		expect(wrapper.classes().indexOf('orange') > -1).toBe(true);

		wrapper.setProps({type: 'success'});
		expect(wrapper.classes().indexOf('green') > -1).toBe(true);

		wrapper.setProps({type: 'neutral'});
		expect(wrapper.classes().indexOf('neutral') > -1).toBe(true);
	});

	it('Renders alert text passed into slot', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				type: 'error'
			},
			slots: {
				default: 'wherever you go'
			}
		});
		expect(wrapper.find('.content').text()).toContain('wherever you go');
	});
});
