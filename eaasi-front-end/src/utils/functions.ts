import def_get from 'lodash/get';

/**
 * Extends Lodash's 'get' to return a default value if the result is null
 *
 * @param obj - The object to search
 * @param {string} path - A dot notated path to the value
 * @param def  - The default value
 */
export function _get(obj: object, path: string, def: any) {
	if(!obj) return def;
	let result = def_get(obj, path, def);
	if(result === undefined || result === null) {
		return def;
	}
	return result;
}

/*============================================================
 == Comparison helpers
/============================================================*/

/**
 * Uses JSON to clone a value
 *
 * @param val - The value to copy
 * @return {T} - The ccopied value
 */
export function jsonCopy<T>(val: any) : T {
	return JSON.parse(JSON.stringify(val)) as T;
}

/**
 * Uses JSON to check if two values are equal when stringified
 *
 * @param val1 - The value to compare
 * @param val2 - The comparison value
 * @return {Boolean} - Returns true when JSON strings are equal
 */
export function jsonEquals(val1: any, val2: any) : boolean {
	return JSON.stringify(val1) === JSON.stringify(val2);
}

/*============================================================
 == Sorting helpers
/============================================================*/

export function sortByQuery(val1: string, val2: string, query: string) {
	if(!val1 || !val2 || !query) return 0;
	query = query.toLowerCase();
	val1 = val1.toLowerCase();
	val2 = val2.toLowerCase();
	let indexA = val1.indexOf(query);
	let indexB = val2.indexOf(query);
	if (indexA === indexB) {
		if (val1 < val2) { return -1; }
		if (val1 > val2) { return 1; }
		return 0;
	}
	return indexA - indexB;
}

/*============================================================
 == Debounce / Throttle
/============================================================*/

export function debounce(func: Function, wait: number, immediate: boolean) {
	let timeout: number | undefined;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			clearTimeout(timeout);
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/*============================================================
 == Positioning
/============================================================*/

export function elementIsInViewport(el: HTMLElement){

	let rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

export function getPageHeightAndWidth() {
	let body = document.body;
	let html = document.documentElement;
	let height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
	let width = window.outerWidth;
	return { height, width };
}

export function elementOverflowsDocument(el: HTMLElement) {
	let max = getPageHeightAndWidth();
	return (
		el.offsetTop < 0 ||
		el.offsetTop + el.clientHeight > max.height ||
		el.offsetLeft < 0 ||
		el.offsetLeft + el.clientWidth > max.width
	);
}

// get the left and top offset of a DOM block element
// returns {x: number, y: number}
export function getPageOffset(el: HTMLElement) {
	let rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		y: rect.top + scrollTop,
		x: rect.left + scrollLeft
	};
}

export function getParameterByName(name) {
	console.log('search', window.location.search);
	let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};