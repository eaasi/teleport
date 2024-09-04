import { LOGS_ROOT_PATH } from '@/config/app-config';
import { IAppLogger } from '@/types/general/log';
import fs from 'fs';
import moment from 'moment';
import winston from 'winston';
import OrmTransport from './ormTransport';
import {TransformableInfo} from 'logform';
const colorizer = winston.format.colorize();

winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'cyan',
	debug: 'green'
});

const options = {
	file: {
		level: 'info',
		filename: `${LOGS_ROOT_PATH}/app-${moment(Date.now()).format('DD-MM-YYYY')}.log`,
		handleExceptions: true,
		json: false,
		maxsize: 26214400, // 25MB
		maxFiles: 30,
		colorize: true,
	},
	console: {
		level: 'error',
	},
}

function buildTransports() {
	if (process.env.NODE_ENV === 'production') {
		return [
			new winston.transports.File(options.file),
			new OrmTransport(),
		];
	} else if (process.env.NODE_ENV === 'test') {
		return [new winston.transports.Stream({
			stream: fs.createWriteStream('/dev/null')
		})];
	} else {
		return [
			new winston.transports.Console({
				level: 'debug',
			})
		]
	}
};

interface IInfo extends TransformableInfo {
	timestamp: Date | string | number;
}

function buildFormatter(): any {
	const { splat, combine, timestamp, printf, colorize } = winston.format;
	if (process.env.NODE_ENV === 'development') {
		const myFormat = printf(({ timestamp, level, message }: IInfo) => {
			return colorizer.colorize(level, `${timestamp} | ${level.toUpperCase()} | ${message}`);
		});
		return combine(
			timestamp(),
			splat(),
			myFormat
		);
	}
}

/**
 * Custom application logger with specified transports
 */
export const logger = () => winston.createLogger({
	format: buildFormatter(),
	transports: buildTransports(),
	exitOnError: false,
	exceptionHandlers: buildTransports()
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
	write: function(message: any): void {
		// use the 'info' log level so the output will be picked up by both transports (file and console)
		logger().info(message);
	},
};

/**
 * Application Logger
 */
export class AppLogger implements IAppLogger {
	/**
	 * Logger implementation
	 */
	public log: winston.Logger;

	constructor() {
		this.log = logger();
	}
}

export default new AppLogger();
