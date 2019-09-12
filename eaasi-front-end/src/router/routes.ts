import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import ImportScreen from '@/components/import/ImportResourceScreen.vue';
import { authorize } from './middleware';

// TODO: Should routes be split into their own files?
import EumlatorManagement from '@/components/admin/emulators/EmulatorManagement.vue';
import MyResourcesScreen from '@/components/resources/MyResourcesScreen.vue';

export default [
	{
		path: '/',
		redirect: {
			path: '/dashboard'
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Home
	},
	{
		path: '/admin/users',
		name: 'User Management',
		component: UserManagement
	},
	{
		path: '/admin/emulators',
		name: 'Emulators',
		component: EumlatorManagement
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
		path: '/login/auth',
		name: 'Authorization Callback',
		beforeEnter: authorize,
		meta: {
			allowGuest: true
		}
	},

	/* Import Resource
	============================================*/

	{
		path: '/import-resource',
		name: 'Import Resource',
		component: ImportScreen,
	},
	{
		path: '/my-resources',
		name: 'My Resources',
		component: MyResourcesScreen
	}
];