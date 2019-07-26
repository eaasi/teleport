/**
 * Custom validators for query strings
 * @param param
 * @returns {boolean}
 */

export function isValidIntegerParam(param) {
	return Number.isInteger(parseInt(param));
}

export function areAllValidIntegerParams(params) {
	return params.every(isValidIntegerParam);
}