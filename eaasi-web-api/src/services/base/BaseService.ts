import AppLogger from '@/logging/appLogger';

export default class BaseService {

	protected readonly _logger: AppLogger

	constructor() {
    	this._logger = new AppLogger(this.constructor.name);
	}

}