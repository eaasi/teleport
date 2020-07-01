import AppLogger from '@/logging/appLogger';
import { IAppLogger } from '@/types/general/log';
import { ICacheHelper } from '@/types/general/cache';
import CacheHelper from '@/helpers/CacheHelper';

export default class BaseService {

	protected readonly _logger: IAppLogger;
	protected readonly _cache: ICacheHelper;

	constructor() {
		this._logger = AppLogger;
		this._cache = new CacheHelper();
	}

}