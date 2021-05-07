export default class KeycloakQuery {
	constructQueryString() {
		return Object.keys(this).map(property => {
			if (this[property] !== undefined && this[property] !== null) {
				return `${encodeURIComponent(property)}=${encodeURIComponent(this[property])}`;
			} else {
				return null;
			}
		}).filter(property => property).join('&');
	}
}