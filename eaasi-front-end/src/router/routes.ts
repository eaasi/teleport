import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import ImportScreen from '@/components/import/ImportResourceScreen.vue';
import { authorize } from './middleware';

// TODO: Should routes be split into their own files?

export default [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Home
	},

	/* Admin
	============================================*/

	{
		path: '/admin/users',
		name: 'user management',
		component: UserManagement
	},

	/* Auth
	============================================*/

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
		meta: {
			title: 'Import Resource'
		}
	}
];