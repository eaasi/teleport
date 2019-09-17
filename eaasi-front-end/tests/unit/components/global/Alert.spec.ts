import { shallowMount } from '@vue/test-utils';
import Alert from '@/components/global/Alert/Alert.vue';

describe('Alert.vue', () => {
	it('Displays error icon when alertType is error', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				alertType: 'error'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Displays info icon when alertType is info', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				alertType: 'info'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(true);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Displays success icon when alertType is success', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				alertType: 'success'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(false);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(true);
	});

	it('Displays warning icon when alertType is warning', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				alertType: 'error'
			},
		});
		expect(wrapper.find('.fa-exclamation-triangle').exists()).toBe(true);
		expect(wrapper.find('.fa-info-circle').exists()).toBe(false);
		expect(wrapper.find('.fa-check-circle').exists()).toBe(false);
	});

	it('Renders alert text passed into slot', () => {
		const wrapper = shallowMount(Alert, {
			propsData: {
				alertType: 'error'
			},
			slots: {
				default: 'wherever you go'
			}
		});
		expect(wrapper.find('.content').text()).toContain('wherever you go');
	});
});
