import { IAppLogger } from '@/logging/appLogger';
import { EventEmitter } from 'events';

export default class MockAppLogger implements IAppLogger {

	log: NodeJS.EventEmitter;

	constructor(source: string, emitter = new EventEmitter()) {
		this.log = emitter;
	}
	
}
