import winston from 'winston';

export interface IAppLogger {
	log: winston.Logger;
}

export interface IApplicationLog {
	level: string;
	message: string;
}