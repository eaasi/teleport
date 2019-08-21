import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import UserManagement from '@/components/admin/UserManagement.vue';
import LoginScreen from '@/components/login/LoginScreen.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: LoginScreen,
			meta: {
				allowGuest: true
			}
		},
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

router.beforeEach((to, from, next) => {
	let isAuthorized = store.get('global/isLoggedIn');
	if(!isAuthorized && !to.matched.some(x => x.meta.allowGuest)) {
		next({
			path: '/login',
			params: { redirectTo: to.fullPath }
		});
	} else if(isAuthorized && to.name === 'Login') {
		next({
			path: '/dashboard'
		});
	}
	else {
		next();
	}
});

export default router;