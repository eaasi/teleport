import cache from 'memory-cache';
import { DEFAULT_CACHE_TIME } from '@/config/app-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addToCache(cacheKey: string, data: any, time: number = DEFAULT_CACHE_TIME) {
	console.log('Adding to cache: ' + cacheKey);
	if(typeof data !== 'string') data = JSON.stringify(data);
	cache.put(cacheKey, data, time)
}

export function getFromCache<T>(cacheKey: string): T {
	console.log('Getting from cache: ' + cacheKey);
	const result = cache.get(cacheKey);
	if(!result) return null;
	console.log('Found in cache: ' + cacheKey);
	return JSON.parse(result);
}

export function deleteFromCache(cacheKey: string) {
	console.log('Deleting from cache: ' + cacheKey);
	cache.del(cacheKey);
}

export function clearCache() {
	cache.clear();
}