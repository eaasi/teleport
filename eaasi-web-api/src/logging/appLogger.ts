import winston from 'winston';
import OrmTransport from './ormTransport';
const fs = require('fs');

function buildTransports(source: string) {
	if (process.env.NODE_ENV === 'production') {
		return [new OrmTransport(source)];
	} else if (process.env.NODE_ENV === 'test') {
		return [new winston.transports.Stream({
			stream: fs.createWriteStream('/dev/null')
		})];
	} else {
		return [new winston.transports.Console()];
	}
}

/**
 * Custom application logger with specified transports
 * @param source Origin of the logging event in the application
 */
const appLogger = (source: string) => winston.createLogger({
	transports: buildTransports(source)
});

/**
 * Application Logger
 */
export default class AppLogger {
	/**
	 * Logger implementation
	 */
	public log: winston.Logger;

	constructor(source: string) {
		this.log = appLogger(source);
	}
}
