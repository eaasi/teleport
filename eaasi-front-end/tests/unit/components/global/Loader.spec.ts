import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import { Loader } from '@/components/global';

enableAutoDestroy(afterEach);

describe('Loader.vue', () => {
	it('It renders logo image as loader', () => {
		const wrapper = shallowMount(Loader, { });
		expect(wrapper.find('img').attributes().src).toContain('header-logo.png');
	});
});
