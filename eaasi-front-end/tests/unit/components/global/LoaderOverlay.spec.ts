import { enableAutoDestroy, mount, shallowMount } from '@vue/test-utils';
import { Loader, LoaderOverlay } from '@/components/global';

enableAutoDestroy(afterEach);

describe('LoaderOverlay.vue', () => {
	it('It wraps loader', () => {
		const wrapper = mount(LoaderOverlay, {
			components: {
				Loader
			}
		});
		expect(wrapper.contains(Loader));
	});
});
