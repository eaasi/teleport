import { EventEmitter } from 'events';
import { IAppLogger } from '../../../src/logging/appLogger';

export default class MockAppLogger implements IAppLogger {

	log: NodeJS.EventEmitter;

	constructor(source: string, emitter = new EventEmitter()) {
		this.log = emitter;
	}
	
}
