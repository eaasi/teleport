import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
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
		path: '/login',
		name: 'Login',
		component: LoginScreen,
		meta: {
			allowGuest: true
		}
	},
	{
		path: '/my-resources',
		name: 'My Resources',
		component: MyResourcesScreen
	}
];