import Home from '@/components/Home.vue';
import EmulatorManagement from '@/components/admin/emulators/EmulatorManagement.vue';
import UserManagement from '@/components/admin/users/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import MyResourcesScreen from '@/components/resources/my-resources/MyResourcesScreen.vue';
import ExploreResourcesScreen from '@/components/resources/explore/ExploreResourcesScreen.vue';
import EmulationProjectScreen from '@/components/emulation-project/EmulationProjectScreen.vue';

export default [
	{
		path: '/',
		redirect: {
			path: '/dashboard'
		},
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Home,
	},
	{
		path: '/admin/users',
		name: 'User Management',
		component: UserManagement
	},
	{
		path: '/admin/emulators',
		name: 'Emulators',
		component: EmulatorManagement
	},
	{
		path: '/emulation-project',
		name: 'Emulation Project',
		component: EmulationProjectScreen
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginScreen,
		meta: {
			allowGuest: true
		}
	},
	{
		path: '/resources/my-resources',
		name: 'My Resources',
		component: MyResourcesScreen
	},
	{
		path: '/resources/explore',
		name: 'My Resources',
		component: ExploreResourcesScreen
	}
];