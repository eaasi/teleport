
export function parseJwt (token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const payload = Buffer.from(base64, 'base64').toString();
	return JSON.parse(payload);
}

export function getUserIdFromToken(token)
{
	if(!token)
		return '';
	let jsonToken  = parseJwt(token);
	return jsonToken ? jsonToken.sub : ''; 
}

export function getTenantIdFromToken(token) {
	if (!token) {
		return '';
	}
	let jsonToken = parseJwt(token);
	return jsonToken ? jsonToken.tid : '';
}