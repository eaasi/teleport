import { enableAutoDestroy, shallowMount } from '@vue/test-utils';
import AdminMenuItem from '@/components/admin/AdminMenuItem.vue';

const menuItem = {
	icon: 'baseball',
	label: 'Fake Label',
	route: 'foo/bar/',
	onClick: () => console.log('clicked!')
};

enableAutoDestroy(afterEach);

describe('AdminMenuItem.vue', () => {
	it('Renders item icon', () => {
		const wrapper = shallowMount(AdminMenuItem, {
			stubs: ['router-link'],
			propsData: {
				item: menuItem
			}});

		const icon = wrapper.find('.admin-menu-icon');
		expect(icon.find('.fa-baseball').exists()).toBe(true);
	});

	it('Renders item label', () => {
		const wrapper = shallowMount(AdminMenuItem, {
			stubs: ['router-link'],
			propsData: {
				item: menuItem
			}});

		expect(wrapper.find('p.txt-sm').text()).toMatch('Fake Label');
	});
});
