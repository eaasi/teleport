import cache from 'memory-cache';
import { DEFAULT_CACHE_TIME } from '@/config/app-config';
import AppLogger from '@/logging/appLogger';

export default class CacheHelper {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static add(cacheKey: string, data: any, time: number = DEFAULT_CACHE_TIME) {
		AppLogger.log.info('Adding to cache: ' + cacheKey);
		if(typeof data !== 'string') data = JSON.stringify(data);
		cache.put(cacheKey, data, time)
	}

	public static clearCache() {
		cache.clear();
	}

	public static get<T>(cacheKey: string): T {
		AppLogger.log.info('Searching cache for: ' + cacheKey);
		const result = cache.get(cacheKey);
		if(!result) return null;
		AppLogger.log.info('Found in cache: ' + cacheKey);
		return JSON.parse(result);
	}

	public static delete(cacheKey: string) {
		AppLogger.log.info('Deleting from cache: ' + cacheKey);
		cache.del(cacheKey);
	}
}