import { Route } from 'vue-router';
import { getParameterByName } from '@/utils/functions';
import store from '@/store';

const JWT_NAME = process.env.VUE_APP_JWT_NAME;

/**
 * Ensures a user is logged in with a valid token befor allowing them to access protecteed routes
 * @param to The route to go to
 * @param _from The current route (unused)
 * @param next Callback method
 */
export function loggedInGuard(to: Route, _from: Route, next: any) {
	let token = localStorage.getItem(JWT_NAME);

	// Redirect to login if no token and the route does not allow guests
	if(!token && !to.matched.some(x => x.meta.allowGuest)) {
		return next({
			path: '/login',
			params: { redirectTo: to.fullPath }
		});
	}

	store.dispatch('global/verifyUserData').then(() => {
		// Redirect to home if the user is trying to go to login but already has a token
		if(token && to.name === 'Login') {
			let path = to.params.redirectTo || '/';
			next({path});
		}

		// Go to requested route
		else {
			next();
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