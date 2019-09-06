'use strict';

import Transport from 'winston-transport';
const { ApplicationLog } = require('../data_access/models');

/**
 * Custom Winston Transport for persisting logs to database via ORM
 */
export default class OrmTransport extends Transport {
	/**
	 * Application source of logged event
	 */
	protected source: string;

	/**
	 * Log Model
	 */
	protected model: any;

	constructor(source: string, model: any = ApplicationLog) {
		super();
		this.source = source;
		this.model = model;
	}

	/**
	 * Transport.log override
	 * @param info
	 * @param callback
	 */
	log(info: any, callback: any) {
		const log = () => {
			const data = {
				message: info.message,
				level: info.level,
				source: this.source,
			};

			this.model.create(data)
				.then((log: any) => {
					this.emit('logged');
					callback(null, log.get());
				}).catch((err: any) => {
					this.emit('error', err);
					console.log(err);
					callback(err);
				});
		};

		return log();
	}
}
