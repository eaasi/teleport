import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import { authorize } from './middleware';

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
	}
];