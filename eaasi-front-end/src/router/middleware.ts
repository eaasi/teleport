import { Route } from 'vue-router';
import store from '@/store';

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

export function authorize(to: Route, _from: Route, next: any) {
	// TODO: userid is temporary for testing. to.query should contain data from shibboleth callback
	let { userid } = to.query;
	if(!userid) next({path: '/login'});
	store.dispatch('global/authorize', {userid}).then(success => {
		if(!success) {
			next({
				path: '/login',
				props: {
					error: true
				}
			});
		} else {
			next({path: '/'});
		}
	});
}

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