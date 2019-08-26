import { Route } from 'vue-router';
import store from '@/store';/**

/**
 * Ensures a user is logged in with a valid token befor allowing them to access protecteed routes
 * @param to The route to go to
 * @param _from The current route (unused)
 * @param next Callback method
 */
export function loggedInGuard(to: Route, _from: Route, next: any) {
	store.dispatch('global/validateToken').then(validated => {
		if(!validated && !to.matched.some(x => x.meta.allowGuest)) {
			next({
				path: '/login',
				params: { redirectTo: to.fullPath }
			});
		} else if(validated && to.name === 'Login') {
			let path = to.params.redirectTo || '/';
			next({path});
		}
		else {
			next();
		}
	});
}

/**
 * Handles auth callbacks from shibboleth
 * @param to The route to go to
 * @param _from The current route (unused)
 * @param next Callback method
 */
export function authorize(to: Route, _from: Route, next: any) {
	// TODO: userid is temporary for testing. to.query should contain data from shibboleth callback
	let { userid } = to.query;
	store.dispatch('global/authorize', {userid}).then(success => {
		if(!success) {
			store.commit('global/SET_LOGIN_ERROR', 'Invalid login, please try again');
			next({
				path: '/login'
			});
		} else {
			store.commit('global/SET_LOGIN_ERROR', null);
			next({path: '/'});
		}
	});
}

/**
 * Updates document metadata based on route
 * @param to The route to go to
 */
export function updateMeta(to: Route) {
	if(to.meta && to.meta.title) {
		document.title = 'Eaasi | ' + to.meta.title;
	} else if(to.name) {
		document.title = 'Eaasi | ' + to.name;
	} else {
		// TODO: Default title should be controlled in the admin CMS
		document.title = 'Eaasi | Emulation as a Service Infrastructure';
	}
};