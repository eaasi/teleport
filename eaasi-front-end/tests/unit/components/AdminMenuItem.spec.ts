import { shallowMount } from '@vue/test-utils';
import AdminMenuItem from '@/components/admin/AdminMenuItem.vue';

const menuItem = {
	icon: 'baseball',
	label: 'Fake Label',
	route: 'foo/bar/',
	onClick: () => console.log('clicked!')
};


describe('AdminMenu.vue', () => {
	it('Renders item icon', () => {
		const wrapper = shallowMount(AdminMenuItem, {
			stubs: ['router-link'],
			propsData: {
				item: menuItem
			}});
		expect(wrapper.find('.admin-menu-icon').contains('baseball'));
	});

	it('Renders item label', () => {
		const wrapper = shallowMount(AdminMenuItem, {
			stubs: ['router-link'],
			propsData: {
				item: menuItem
			}});
		expect(wrapper.find('p.txt-sm').contains('Fake Label'));
	});
});
