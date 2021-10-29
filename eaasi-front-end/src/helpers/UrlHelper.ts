/**
 * Returns true if the provided URL is a valid match
 * @param url: string URL to check
 */
export function isValidUrl(url: string) {
	// eslint-disable-next-line
    const urlPattern = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
	const regex = new RegExp(urlPattern);
	return !!url.match(regex);
}