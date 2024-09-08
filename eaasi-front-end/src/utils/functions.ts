import def_get from 'lodash/get';
import jwt from 'jsonwebtoken';

/**
 * Extends Lodash's 'get' to return a default value if the result is null
 *
 * @param obj - The object to search
 * @param {string} path - A dot notated path to the value
 * @param def  - The default value
 */
export function _get(obj: object, path: string, def: any) {
	if(!obj) return def;
	const result = def_get(obj, path, def);
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
	const indexA = val1.indexOf(query);
	const indexB = val2.indexOf(query);
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

export function debounce(func: Function, wait: number, immediate: boolean, ...args: any[]) {
	let timeout: NodeJS.Timeout | undefined;
	return function() {
		const context = this;
		const later = function() {
			clearTimeout(timeout);
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

/*============================================================
 == Positioning
/============================================================*/

export function elementIsInViewport(el: HTMLElement){

	const rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

export function getPageHeightAndWidth() {
	const body = document.body;
	const html = document.documentElement;
	const height = Math.max(
		body.scrollHeight,
		body.offsetHeight,
		html.clientHeight,
		html.scrollHeight,
		html.offsetHeight
	);
	const width = window.outerWidth;
	return { height, width };
}

export function elementOverflowsDocument(el: HTMLElement) {
	const max = getPageHeightAndWidth();
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
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return {
		y: rect.top + scrollTop,
		x: rect.left + scrollLeft
	};
}

export function getParameterByName(name) {
	const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

/*============================================================
 == Scripts
/============================================================*/

export function appendScript(scriptText: string) {
	if(!scriptText) throw 'script string is required';
	const script   = document.createElement('script');
	script.type  = 'text/javascript';
	script.text  = scriptText;
	document.body.appendChild(script);
}

/*============================================================
 == Regular Expressions
/============================================================*/
export function isSpaces(str){
	return str.match(/^ *$/) !== null;
}

/*============================================================
 == String Manipulation
/============================================================*/

export function slugify(string: string, delimeter: string = '-') {
	const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
	let b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
	if(delimeter !== '-') b = b.replace('-', delimeter);
	const p = new RegExp(a.split('').join('|'), 'g');

	return string.toString().toLowerCase()
	  .replace(/\s+/g, delimeter) // Replace spaces with -
	  .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
	  .replace(/&/g, '-and-') // Replace & with 'and'
	  .replace(/[^\w\-]+/g, '') // Remove all non-word characters
	  .replace(/\-\-+/g, delimeter) // Replace multiple - with single -
	  .replace(/^-+/, '') // Trim - from start of text
	  .replace(/-+$/, ''); // Trim - from end of text
}

/*============================================================
 == Generators
/============================================================*/

export function generateId(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

/*============================================================
 == Mappers
/============================================================*/
export function removeDuplicatesFromFlatArray<T>(arr: T[]): T[] {
	return arr.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
}

export function moveElementInsideArray(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
}

export function createJwt(secret) {
	const claims = {
		exp: Math.floor(Date.now() / 1000) + (60 * 60)
	};

	return jwt.sign(claims, secret, {algorithm: 'HS256'});
}