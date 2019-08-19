/**
 * Custom validators for query strings
 * @param param
 * @returns {boolean}
 */

export function isValidIntegerParam(param: any) {
	return Number.isInteger(parseInt(param));
}

export function areAllValidIntegerParams(params: Array<any>) {
	return params.every(isValidIntegerParam);
}