import { shallowMount } from '@vue/test-utils';
import AdminMenu from '@/components/admin/AdminMenu.vue';
import AdminMenuItem from '@/components/admin/AdminMenuItem.vue';

describe('AdminMenu.vue', () => {
	it('Displays all menu items', () => {
		const wrapper = shallowMount(AdminMenu, {});
		const userMenuItems = wrapper.vm.$data['userMenuItems'];
		const menuItems = wrapper.vm.$data['menuItems'];
		const allItems = userMenuItems.concat(menuItems);
		expect(wrapper.findAll(AdminMenuItem).length).toBe(allItems.length);
	});

	it('Contains Node Management section', () => {
		const wrapper = shallowMount(AdminMenu, {});
		expect(wrapper.contains('Node Management'));
	});

	it('Contains Node User Administration section', () => {
		const wrapper = shallowMount(AdminMenu, {});
		expect(wrapper.contains('Node User Administration'));
	});
});
