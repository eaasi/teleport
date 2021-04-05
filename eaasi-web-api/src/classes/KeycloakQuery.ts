export default class KeycloakQuery {
	constructQueryString() {
		return Object.keys(this).map(property => `${property}=${this[property]}`).join('&');
	}
}