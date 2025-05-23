import { Route } from 'vue-router';
import store from '@/store';

/**
 * Ensures a user is logged in with a valid token before allowing them to access protected routes
 * @param to The route to go to
 * @param _from The current route (unused)
 * @param next Callback method
 */
export function loggedInGuard(to: Route, _from: Route, next: any) {

	// Should be a separate guard; multiple guards not supported without workarounds
	window.scrollTo(0, 0);

	if (to.matched.some(x => x.meta.allowGuest)) {
		return next();
	}

	store.dispatch('initSession').then((success) => {
		// Redirect to login if no token and the route does not allow guests
		if (!success && !to.matched.some(x => x.meta.allowGuest)) {
			(window as any).keycloak.logout();
		}

		// Go to requested route
		else {
			return next();
		}
	});
}

/**
 * Updates document metadata based on route
 * @param to The route to go to
 */
export function updateMeta(to: Route) {
	if(to.meta && to.meta.title) {
		document.title = 'EAASI | ' + to.meta.title;
	} else if(to.name) {
		document.title = 'EAASI | ' + to.name;
	} else {
		document.title = 'EAASI | Emulation as a Service Infrastructure';
	}
}