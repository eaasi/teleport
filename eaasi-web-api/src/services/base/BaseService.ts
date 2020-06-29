import AppLogger from '@/logging/appLogger';
import { IAppLogger } from '@/types/general/log';

export default class BaseService {

	protected readonly _logger: IAppLogger;

	constructor() {
    	this._logger = AppLogger;
	}

}