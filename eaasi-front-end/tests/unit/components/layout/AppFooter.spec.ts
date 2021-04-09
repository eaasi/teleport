import AppFooter from '@/components/layout/AppFooter.vue';
import { shallowMount } from '@vue/test-utils';

describe('AppFooter.vue', () => {

	const footer = shallowMount(AppFooter);

	it('Contains a copyright notice', () => {
		expect(footer.find('#footerLogo').text()).toContain('© EaaSI');
	});

	it('Contains a mailto link reference eaasi@yale.edu', () => {
		let mailto = footer.find('#eaasiEmail').attributes('href');
		expect(mailto).toContain('mailto:eaasi@yale.edu');
	});

	it('Contains a link to the Software Preservation Network', () => {
		let link = footer.find('#eaasi-website').attributes('href');
		expect(link).toBe('https://www.eaasi.cloud');
	});
});
