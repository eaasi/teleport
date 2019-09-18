import { Route } from 'vue-router';
import store from '@/store';

/**
 * Ensures a user is logged in with a valid token before allowing them to access protected routes
 * @param to The route to go to
 * @param _from The current route (unused)
 * @param next Callback method
 */
export function loggedInGuard(to: Route, _from: Route, next: any) {
	store.dispatch('initSession').then((success) => {
		// Redirect to login if no token and the route does not allow guests
		if(!success && !to.matched.some(x => x.meta.allowGuest)) {
			next({
				path: '/login',
				params: { redirectTo: to.fullPath }
			});
		}

		// Redirect to home if the user is trying to go to login but already has a token
		else if(success && to.name === 'Login') {
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
		document.title = 'Eaasi | Emulation as a Service Infrastructure';
	}
};