import AppFooter from '@/components/layout/AppFooter.vue';
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';

describe('AppFooter.vue', () => {

	enableAutoDestroy(afterAll);

	const footer = shallowMount(AppFooter);

	it('Contains a link to the Software Preservation Network', () => {
		const link = footer.find('#eaasi-website').attributes('href');
		expect(link).toBe('https://forum.eaasi.cloud');
	});
});
