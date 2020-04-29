import { LOGS_ROOT_PATH } from '@/config/app-config';
import fs from 'fs';
import moment from 'moment';
import winston from 'winston';
import OrmTransport from './ormTransport';

const options = {
	file: {
		level: 'info',
		filename: `${LOGS_ROOT_PATH}/app-${moment(Date.now()).format('DD-MM-YYYY')}.log`,
		handleExceptions: true,
		json: false,
		maxsize: 5242880, // 5MB
		maxFiles: 1000,
		colorize: true,
	},
	console: {
		level: 'debug',
		handleExceptions: true,
		json: false,
		colorize: true,
		simple: true
	},
}

function buildTransports(source: string) {
	if (process.env.NODE_ENV === 'production') {
		return [
			new winston.transports.File(options.file),
			new OrmTransport(source),
		];
	} else if (process.env.NODE_ENV === 'test') {
		return [new winston.transports.Stream({
			stream: fs.createWriteStream('/dev/null')
		})];
	} else {
		return [
			new winston.transports.File(options.file),
			new OrmTransport(source),
			new winston.transports.Console(options.console)
		];
	}
}

/**
 * Custom application logger with specified transports
 * @param source Origin of the logging event in the application
 */
export const logger = (source: string = 'unknown') => winston.createLogger({
	transports: buildTransports(source),
	exitOnError: false,
	exceptionHandlers: buildTransports(source)
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function(message, encoding) {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger().info(message);
	},
};

/**
 * Application Logger
 */
export default class AppLogger {
	/**
	 * Logger implementation
	 */
	public log: winston.Logger;

	constructor(source: string) {
		this.log = logger(source);
	}
}