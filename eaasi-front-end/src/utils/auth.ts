import { Route } from 'vue-router';


export function requireAuthGuard(
	to: Route,
	from: Route,
	next: (to?: string | false | void | Location) => any
) {

}