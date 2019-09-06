import winston from 'winston';
import OrmTransport from './ormTransport';

/**
 * Custom application logger with specified transports
 * @param source Origin of the logging event in the application
 */
const appLogger = (source: string) => winston.createLogger({
	transports: [
		new OrmTransport(source)
	]
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
