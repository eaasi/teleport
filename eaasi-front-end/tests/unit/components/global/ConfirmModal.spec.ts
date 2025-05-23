import { enableAutoDestroy, mount, shallowMount } from '@vue/test-utils';
import {ConfirmModal, Loader, LoaderOverlay, Modal, UiButton} from '@/components/global';

enableAutoDestroy(afterEach);

describe('ConfirmModal.vue', () => {
	it('It wraps Modal component', () => {
		const wrapper = mount(ConfirmModal, {
			components: {
				ConfirmModal,
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat',
				confirmLabel: 'confirm',
				cancelLabel: 'cancel',
				size: 'lg'
			}
		});
		expect(wrapper.findComponent(Modal).exists()).toBe(true);
	});

	it('It renders title passed as prop', () => {
		const wrapper = mount(ConfirmModal, {
			components: {
				ConfirmModal,
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat',
				confirmLabel: 'confirm',
				cancelLabel: 'cancel',
				size: 'lg'
			}
		});
		expect(wrapper.find('h2').text()).toBe('cat');
	});

	it('It renders correct button labels passed as props', () => {
		const wrapper = mount(ConfirmModal, {
			components: {
				ConfirmModal,
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat and dog',
				confirmLabel: 'gus',
				cancelLabel: 'lumi',
				size: 'lg'
			}
		});
		expect(wrapper.find('.btn-modal-cancel').text()).toEqual('lumi');
		expect(wrapper.find('.btn-modal-confirm').text()).toEqual('gus');
	});

	it('Clicking cancel triggers cancel method', () => {
		const wrapper = mount(ConfirmModal, {
			components: {
				ConfirmModal,
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat and dog',
				confirmLabel: 'gus',
				cancelLabel: 'lumi',
				size: 'lg'
			}
		});

		wrapper.find('.btn-modal-cancel button').trigger('click');
		expect(wrapper.emitted('click:cancel')).toBeTruthy();
	});

	it('Clicking confirm triggers emit click:confirm event', () => {
		const wrapper = mount(ConfirmModal, {
			components: {
				ConfirmModal,
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat and dog',
				confirmLabel: 'gus',
				cancelLabel: 'lumi',
				size: 'lg'
			}
		});
		wrapper.find('.btn-modal-confirm button').trigger('click');
		expect(wrapper.emitted()).toEqual({'click:confirm': [[]]});
	});
});
