import AppFooter from '@/components/layout/AppFooter.vue';
import { enableAutoDestroy, shallowMount } from '@vue/test-utils';

enableAutoDestroy(afterEach);

describe('AppFooter.vue', () => {

	const footer = shallowMount(AppFooter);

	it('Contains a copyright notice', () => {
		expect(footer.find('#footerLogo').text()).toContain('© EaaSI');
	});

	it('Contains a mailto link reference eaasi@yale.edu', () => {
		const mailto = footer.find('#eaasiEmail').attributes('href');
		expect(mailto).toContain('mailto:eaasi@yale.edu');
	});

	it('Contains a link to the Software Preservation Network', () => {
		const link = footer.find('#eaasi-website').attributes('href');
		expect(link).toBe('https://www.eaasi.cloud');
	});
});
