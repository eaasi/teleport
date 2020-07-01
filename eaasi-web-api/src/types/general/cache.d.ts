export interface ICacheHelper {
	add(cacheKey: string, data: any, time?: number): void;
	clearCache(): void;
	get<T>(cacheKey: string): T
	delete(cacheKey: string): void;
}