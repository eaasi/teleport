import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
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
		}
	]
});
