  
import MockAppLogger from './mock-app-logger';

export class MockBaseService {

	protected readonly _logger: MockAppLogger;

	constructor() {
    	this._logger = new MockAppLogger(this.constructor.name);
	}

}