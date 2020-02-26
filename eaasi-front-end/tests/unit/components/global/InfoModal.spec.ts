import {InfoModal, Modal, UiButton} from '@/components/global';
import {mount} from '@vue/test-utils';

describe('InfoModal.vue', () => {
	it('It wraps Modal component', () => {
		const wrapper = mount(InfoModal, {
			components: {
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat',
				size: 'lg',
				buttonText: 'cat',
			}
		});
		expect(wrapper.contains(Modal));
	});

	it('It renders title passed as prop', () => {
		const wrapper = mount(InfoModal, {
			components: {
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'oregon',
				size: 'lg',
				buttonText: 'cat',
			}
		});
		expect(wrapper.find('h2').text()).toBe('oregon');
	});

	it('It renders correct button labels passed as props', () => {
		const wrapper = mount(InfoModal, {
			components: {
				UiButton
			},
			slots: {
				default: 'modernism',
			},
			propsData: {
				title: 'faulkner',
				buttonText: 'woolf',
				size: 'lg'
			}
		});
		expect(wrapper.find('.btn-info-modal-close').text()).toEqual('woolf');
	});

	it('Clicking modal button triggers emit close event', () => {
		const wrapper = mount(InfoModal, {
			components: {
				UiButton
			},
			slots: {
				default: 'hello world',
			},
			propsData: {
				title: 'cat and dog',
				buttonText: 'cat',
				size: 'lg'
			}
		});
		wrapper.find('.btn-info-modal-close button').trigger('click');
		expect(wrapper.emitted()).toEqual({'close': [[]]});
	});
});
