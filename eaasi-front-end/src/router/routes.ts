import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import { authorize } from './middleware';

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
	{
		path: '/admin/users',
		name: 'user management',
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