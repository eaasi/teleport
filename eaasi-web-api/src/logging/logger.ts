import winston from 'winston';
import OrmTransport from './ormTransport';

export const appLogger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new OrmTransport()
	]
});
