export default class StringCleaner {
	/**
	 * Returns the inner text of an HTML element passed as a string
	 * @param html: string HTML element
	 */
	static stripHTML(html: string) {
		let div = document.createElement('div');
		div.innerHTML = html;
		return div.innerText;
	}
}