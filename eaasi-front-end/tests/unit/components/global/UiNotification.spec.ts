import { UiNotification } from '@/components/global';
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';

enableAutoDestroy(afterEach);

describe('UiNotification.vue', () => {
	it('Renders notification text passed into slot', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
			},
			slots: {
				default: 'Default!'
			}
		});
		expect(wrapper.find('.ui-notification-container').text()).toBe('Default!');
	});

	it('Renders danger color preset if passed', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
				colorPreset: 'danger'
			},
			slots: {
				default: 'Danger Notification'
			}
		});
		expect(wrapper.find('.danger').exists()).toBeTruthy();
	});

	it('Renders warning color preset if passed', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
				colorPreset: 'warning'
			},
			slots: {
				default: 'Warning Notification'
			}
		});
		expect(wrapper.find('.warning').exists()).toBeTruthy();
	});

	it('Renders info color preset if passed', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
				colorPreset: 'info'
			},
			slots: {
				default: 'Info Notification'
			}
		});
		expect(wrapper.find('.info').exists()).toBeTruthy();
	});

	it('Renders success color preset if passed', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
				colorPreset: 'success'
			},
			slots: {
				default: 'Success Notification'
			}
		});
		expect(wrapper.find('.success').exists()).toBeTruthy();
	});

	it('Renders success color preset by default', () => {
		const wrapper = shallowMount(UiNotification, {
			propsData: {
				label: 'Test',
			},
			slots: {
				default: 'Success Notification'
			}
		});
		expect(wrapper.find('.success').exists()).toBeTruthy();
	});

});
