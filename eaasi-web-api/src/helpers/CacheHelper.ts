import cache from 'memory-cache';
import { DEFAULT_CACHE_TIME } from '@/config/app-config';
import AppLogger from '@/logging/appLogger';
import { ICacheHelper } from '@/types/general/cache';

export default class CacheHelper implements ICacheHelper {

	public add(cacheKey: string, data: any, time: number = DEFAULT_CACHE_TIME) {
		AppLogger.log.info('Adding to cache: ' + cacheKey);
		if (typeof data !== 'string') data = JSON.stringify(data);
		cache.put(cacheKey, data, time)
	}

	public clearCache() {
		AppLogger.log.info('Clearing all cache');
		cache.clear();
	}

	public get<T>(cacheKey: string): T {
		// We're temporarily disabling cache
		AppLogger.log.warn('Temporarily overriding cache for search: ' + cacheKey);
		return null;

		AppLogger.log.info('Searching cache for: ' + cacheKey);
		const result = cache.get(cacheKey);
		if (!result) return null;
		AppLogger.log.info('Found in cache: ' + cacheKey);
		return JSON.parse(result);
	}

	public delete(cacheKey: string) {
		AppLogger.log.info('Deleting from cache: ' + cacheKey);
		cache.del(cacheKey);
	}
}
