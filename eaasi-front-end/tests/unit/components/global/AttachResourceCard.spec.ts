import { enableAutoDestroy, mount, shallowMount } from '@vue/test-utils';
import { AttachResourceCard, UiButton } from '@/components/global';

enableAutoDestroy(afterEach);

describe('AttachResourceCard.vue', () => {
	it('Renders title prop in component', () => {
		const wrapper = shallowMount(AttachResourceCard, {
			propsData: {
				title: 'dino-dna',
			},
			components: {
				UiButton
			}
		});

		expect(wrapper.find('.arc-title .uppercase').text()).toBe('dino-dna');
	});

	it('Invokes searchForEnvironment when arc-search-button UiButton btnClicked event emits', () => {
		const searchForEnvironment = jest.fn();
		const wrapper = mount(AttachResourceCard, {
			propsData: {
				title: 'anything',
			},
			components: {
				UiButton
			},
			methods: {
				searchForEnvironment
			}
		});

		wrapper.find('.arc-search-button').vm.$emit('btnClicked');
		expect(searchForEnvironment).toBeCalledTimes(1);
	});

	it('Invokes openMyResources when arc-open-my-resources-button UiButton btnClicked event emits', () => {
		const openMyResources = jest.fn();
		const wrapper = mount(AttachResourceCard, {
			propsData: {
				title: 'candelabra',
			},
			components: {
				UiButton
			},
			methods: {
				openMyResources
			}
		});

		wrapper.find('.arc-open-my-resources-button').vm.$emit('btnClicked');
		expect(openMyResources).toBeCalledTimes(1);
	});
});
